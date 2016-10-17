var AWS = require('aws-sdk');
var config = require('../config');
var fs = require('fs');

AWS.config.update({
    accessKeyId: config.AWS_KEY_ID,
    secretAccessKey: config.AWS_ACCESS_KEY
});

var s3 = new AWS.S3({ signatureVersion: 'v4'});

exports.addPhotoToS3 = function (keyS3, bodyS3, cb) {
    s3.upload({
        Bucket: 'flatbel',
        Key: keyS3,
        Body: fs.createReadStream(bodyS3),
        ACL: 'public-read',
        ContentType: 'image/png'
    }, cb);
};
