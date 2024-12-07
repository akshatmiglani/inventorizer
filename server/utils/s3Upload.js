const AWS=require('aws-sdk')
const fs=require('fs');

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY
});

function uploadToS3(filePath,bucketName,key){
    return new Promise((resolve,reject)=>{
        const fileStream = fs.createReadStream(filePath);
        const params = {
            Bucket: bucketName,
            Key: key, 
            Body: fileStream,
            ContentType: 'application/pdf'
        };

        s3.upload(params,(err,data)=>{
            if(err) reject(err);
            else resolve(data.Location);
        })
    })

}

module.exports={uploadToS3}