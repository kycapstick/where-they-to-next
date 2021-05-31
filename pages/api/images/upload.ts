import AWS from 'aws-sdk';
import formidable from 'formidable-serverless';
import fs from 'fs';
import { query } from '../../../lib/db'
const tinify = require('tinify');


export const config = {
    api: {
        bodyParser: false,
    }
}

const optimizeImage = (file) => {
    return new Promise(async (resolve, reject) => {
        tinify.key = process.env.TINIFY_API_KEY;
        try {
            tinify.fromBuffer(file).toBuffer(function(err, resultData) {
                if (err) {
                    return reject(err);
                }
                return resolve(resultData);
            });
        } catch( err ) {
            return reject(err);
        }
    })

}

export default async (req, res) => {
    const s3 = new AWS.S3({
        endpoint: new AWS.Endpoint('nyc3.digitaloceanspaces.com'),
        accessKeyId: process.env.DO_SPACES_KEY,
        secretAccessKey: process.env.DO_SPACES_SECRET,
        region: 'nyc3',
    })
    const form = new formidable.IncomingForm();
    form.maxFileSize = 5 * 1024 * 1024;
    try {
        const response = await new Promise((resolve, reject) => {
            form.parse(req, async(err, fields, files) => {
                if (err || !fields.user_id) return res.status(500);
                const file = fs.readFileSync(files.file.path);
                try {
                    const fileName = files.file.name.replace(' ', '-');
                    const optimizedFile = await optimizeImage(file);
                    const { Location } = await s3.upload({
                        Bucket: process.env.DO_SPACES_BUCKET,
                        ACL: 'public-read',
                        Key: `${fields.user_id}/${fileName}`,
                        Body: optimizedFile, 
                        ContentType: 'image/jpeg'
                    }).promise();
                    if (!Location) {
                        res.status(501).json({ message: 'Something went wrong'})
                    }
                    const results = await query(
                        `
                            INSERT INTO images(name, url, user_id)
                            VALUES(?,?,?)
                        `,
                        [files.file.name, Location, fields.user_id]
                    )
                    return resolve({ id: results.insertId, url: Location })    
                } catch(error) {
                    console.log(error);
                    return reject(error);
                }
            });
        });
        res.status(200).json( { response });
    } catch(err) {
        console.log(err);
    }
    
}