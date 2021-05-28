import AWS from 'aws-sdk';
import formidable from 'formidable-serverless';
import fs from 'fs';

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
    await form.parse(req, async(err, fields, files) => {
        if (err || !fields.user_id) return res.status(500);
        const file = fs.readFileSync(files.file.path);
        s3.upload({
            Bucket: process.env.DO_SPACES_BUCKET,
            ACL: 'public-read',
            Key: `${fields.user_id}/${files.file.name}`,
            Body: file, 
            ContentType: 'image/jpeg'
        }).send((err, data) => {
            if (err) {
                console.log('err', err);
                return res.status(500);
            }
            if (data) {
                console.log('data', data);
                return res.json({
                    url: data.Location
                })
            }
        })
    });
}