import AWS from 'aws-sdk';
import formidable from 'formidable-serverless';
import fs from 'fs';
import { query } from '../../../lib/db'

export const config = {
    api: {
        bodyParser: false,
    }
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
                    const { Location } = await s3.upload({
                        Bucket: process.env.DO_SPACES_BUCKET,
                        ACL: 'public-read',
                        Key: `${fields.user_id}/${fileName}`,
                        Body: file, 
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
                    return resolve(Location)    
                } catch(error) {
                    console.log(error);
                    return reject(error);
                }
            });
        });
        res.status(200).json( {url: response });
    } catch(err) {
        console.log(err);
    }
    
}