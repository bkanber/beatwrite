'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const aws = require('aws-sdk'),
      config = require('config'),
      crypto = require('crypto');

module.exports = (() => {
    var _ref = _asyncToGenerator(function* (file_type) {

        aws.config.update({ accessKeyId: process.env.AWS_ACCESS_KEY, secretAccessKey: process.env.AWS_SECRET_KEY });

        const s3 = new aws.S3();

        try {
            console.log('the file type is ', file_type);
            if (file_type !== "audio/mp3" && file_type !== "audio/x-m4a" && file_type !== "audio/wav") {
                return { success: false, error: 'Please provide a valid audio format of .mp3, .m4a, or .wav' };
            }
            let buffer = yield crypto.randomBytes(12);

            let key = buffer.toString('hex');

            let options = {
                Bucket: config.AWS_S3_BUCKET,
                Key: key,
                Expires: 60,
                ContentType: file_type,
                ACL: 'public-read'
            };

            let data = yield s3.getSignedUrl('putObject', options);
            console.log('data was', data);
            return {
                success: true,
                signed_request: data,
                url: 'https://s3.amazonaws.com/' + process.env.AWS_S3_BUCKET + '/' + key,
                key
            };
        } catch (error) {
            console.log('the error was', error);
            return {
                success: false,
                error: error.message
            };
        }
    });

    return function (_x) {
        return _ref.apply(this, arguments);
    };
})();