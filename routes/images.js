var express = require('express');
var multiparty = require('multiparty');
var http = require('http');
var util = require('util');

var router = express.Router();

var AWS = require('aws-sdk');
var s3 = new AWS.S3();


var BUCKET =  'elasticbeanstalk-us-west-2-393679320285';
var folder =  'images';
var status =  'status';
var success = 'success';
var error =   'error';



//
// Save an image (see: https://github.com/andrewrk/node-multiparty/tree/master/examples)
//
router.post('/:name', function(req, res) {

  var form = new multiparty.Form();
  var destPath = folder + '/' + req.params.name;

  form.on('part', function(part) {
    s3.putObject({
      Bucket: BUCKET,
      Key: folder + '/' + req.params.name,
      ACL: 'public-read',
      Body: part,
      ContentLength: part.byteCount,
    }, function(err, data) {
      if (err) {
        console.log('error storing image on s3: ' + err);
        res.send('{"' + status + '":"' + error + '","message":"' + err + '"}');
      } else {
        console.log("done", data);
        var url = 'https://' + BUCKET + '.s3.amazonaws.com/' + destPath;
        res.send('{"' + status + '":"' + success + '","url":"' + url + '"}');
        console.log("image saved to: " + url);
      }
    });
  });
  form.parse(req);


//   console.dir(req.files);
// 
//   buf = new Buffer(req.body.imageBinary.replace(/^data:image\/\w+;base64,/, ""),'base64');
//   var params = {
//     Key: folder + '/' + req.params.name,
//     Body: buf,
//     ContentEncoding: 'base64',
//     ContentType: 'image/jpeg'
//   };
//   s3Bucket.putObject(BUCKET, params, function(err, data) {
//       if (err) { 
//         console.log(err);
//         console.log('Error uploading data: ', data); 
//         res.send('Error saving file: ' + err);
//       } else {
//         console.log('succesfully uploaded the image!');
//         res.send('{"' + status + '":"' + success + '","name":"' + req.params.name + '"}');
//       }
//   });
});

module.exports = router;
