var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var AWS = require('aws-sdk');
var s3 = new AWS.S3();

app.use(allowCrossDomain);
app.use(bodyParser.json());

var BUCKET =  'elasticbeanstalk-us-west-2-393679320285';
var folder =  'customizations';
var status =  'status';
var success = 'success';
var error =    'error';


// CORS support
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};



/* GET home page. */
app.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

app.get('/about', function(req, res) {
  res.send('Blanco - Customization Settings Manager for White-Label of Aria');
});

app.options('/about', function(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', '*');
});

app.get('/blanco/api/customizations/all', function(req, res) {
  res.send('This will be to retrieve all config filenames');
});

app.get('/blanco/api/customizations/:id', function(req, res) {
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

// Dummy service to retrieve json
app.get('/blanco/api/customizations/abcd-1234', function(req, res) {
  res.send('{"id":"abcd-1234","name":"Jones Customization File","Button-color":"#339933"}');
});

app.post('/blanco/api/customizations', function(req, res) {
  var submission = {};

  submission = req.body;
  
  var params = {Bucket: BUCKET, Key: folder + '/' + submission.id, Body: JSON.stringify(submission)};
  s3.putObject(params, function(err, data) {
    if (err) {
      console.log(err);
      res.send('Error saving file: ' + err);
    }
    else
    {
      console.log("Successfully uploaded data to " + folder + "/" + submission.id);
      res.send('{"' + status + '":"' + success + '","id":"' + submission.id + '"}');
    }
  });
});

app.delete('/blanco/api/customizations/:id', function(req, res) {
  var params = {Bucket: BUCKET, Key: folder + '/' + req.params.id};
  s3.deleteObject(params, function(err, data) {
    if (err) console.log(err, err.stack);
    else
    {
      console.log(req.params.id + ' deleted.');
      res.send('{"' + status + '":"' + success + '","message":"' + req.params.id + '" deleted"}');
    }
  });
});


module.exports = app;
