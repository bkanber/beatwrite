const aws = require('aws-sdk'),
    config = require('config'),
    crypto = require('crypto');


module.exports = async function(file_type) {

    aws.config.update({accessKeyId: config.AWS_ACCESS_KEY, secretAccessKey: config.AWS_SECRET_KEY})

    const s3 = new aws.S3();

    try {
        console.log('the file type is ', file_type)
        if (file_type !== "audio/mp3" && file_type !== "audio/x-m4a" && file_type !== "audio/wav") {
            return ({success: false, error: 'Please provide a valid audio format of .mp3, .m4a, or .wav'});
        }
        let buffer = await crypto.randomBytes(12);

        let key = buffer.toString('hex');

        let options = {
            Bucket: config.AWS_S3_BUCKET,
            Key: key,
            Expires: 60,
            ContentType: file_type,
            ACL: 'public-read',
        }

        let data = await s3.getSignedUrl('putObject', options);
        console.log('data was', data)
        return ({
            success: true,
            signed_request: data,
            url: ('https://s3.amazonaws.com/' + config.AWS_S3_BUCKET + '/' + key),
            key,
        });
    } catch (error) {
        console.log('the error was', error)
        return ({
            success: false,
            error: error.message,
        })
    }
}