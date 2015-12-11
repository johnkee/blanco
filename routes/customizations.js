var express = require('express');
var router = express.Router();

//var app = express();
//var bodyParser = require('body-parser');
var AWS = require('aws-sdk');
var s3 = new AWS.S3();

//router.use(allowCrossDomain);
//router.use(bodyParser.json());

var BUCKET =  'elasticbeanstalk-us-west-2-393679320285';
var folder =  'customizations';
var status =  'status';
var success = 'success';
var error =   'error';


// CORS support
// var allowCrossDomain = function(req, res, next) {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
//     res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
// 
//     intercept OPTIONS method
//     if ('OPTIONS' == req.method) {
//       res.send(200);
//     }
//     else {
//       next();
//     }
// };



/* GET home page. */
router.get('/all', function(req, res) {
  res.send('This will be to retrieve all config filenames');
});

router.get('/:id', function(req, res) {
  var params = {Bucket: BUCKET, Key: folder + '/' + req.params.id};
  s3.getObject(params, function(err, data) {
    if (err) {
      console.log(err)
      res.send('{"' + status + '":"' + error + '", "message":"' + err + '"}');
    }
    else
    {
      res.send(data.Body.toString());
    }
  });
});

router.post('/', function(req, res) {
  var submission = req.body;
  
  var params = {Bucket: BUCKET, Key: folder + '/' + submission.id, Body: JSON.stringify(submission)};
  s3.putObject(params, function(err, data) {
    if (err) {
      console.log(err);
      res.send('Error saving file: ' + err);
      res.send('Make sure POST data has an "id" field and that content type is application/json');
    }
    else
    {
      console.log("Successfully uploaded data to " + folder + "/" + submission.id);
      //res.send(JSON.stringify(submission));
      res.send('{"' + status + '":"' + success + '","id":"' + submission.id + '"}');
    }
  });
});

router.delete('/:id', function(req, res) {
  var params = {Bucket: BUCKET, Key: folder + '/' + req.params.id};
  s3.deleteObject(params, function(err, data) {
    if (err) console.log(err, err.stack);
    else
    {
      console.log(req.params.id + ' deleted.');
      res.send('{"' + status + '":"' + success + '","message":"' + req.params.id + ' deleted"}');
    }
  });
});


module.exports = router;
