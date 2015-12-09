var express = require('express');
var router = express.Router();
var AWS = require('aws-sdk');
var s3 = new AWS.S3();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/about', function(req, res) {
  res.send('Blanco - Customization Settings Manager for White-Label of Aria');
});

router.get('/test-write', function(req, res) {
  //
  // Test writing to S3
  //
  s3.createBucket({Bucket: 'elasticbeanstalk-us-west-2-393679320285'}, function() {
    var params = {Bucket: 'elasticbeanstalk-us-west-2-393679320285', Key: 'configs/testKey', Body: 'Hello!'};
    s3.putObject(params, function(err, data) {
        if (err) {
            console.log(err)
            res.send('Error writing to S3 - ' + err);
        }
        else
        {
          console.log("Successfully uploaded data to configs/newTestKey");
          res.send('wrote test record.  Check S3 congigs/testKey');
        }
     });
  });
});

router.get('/blanco/api/customizations/all', function(req, res) {
  res.send('This will be to retrieve all config filenames');
});

router.get('/blanco/api/customizations', function(req, res) {
  res.send('This will be to retrieve a given config JSON');
});

// Dummy service to retrieve json
router.get('/blanco/api/customizations/abcd-1234', function(req, res) {
  res.send('{"id":"abcd-1234","name":"Jones Customization File","Button-color":"#339933"}');
});

router.post('/blanco/api/customizations', function(req, res) {
  res.send('This will be to save a given config JSON');
});

router.delete('/blanco/api/customizations', function(req, res) {
  res.send('This will be to delete a given config JSON');
});


module.exports = router;
