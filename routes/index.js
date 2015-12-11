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

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/blanco/about', function(req, res) {
  res.send('Blanco - Customization Settings Manager for White-Label of Aria');
});



module.exports = router;
