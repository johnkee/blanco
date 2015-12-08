var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/about', function(req, res) {
  res.send('Blanco - Customization Settings Manager for White-Label of Aria');
});

router.get('/config/all', function(req, res) {
  res.send('This will be to retrieve all config filenames');
});

router.get('/white-label/sparkly', function(req, res) {
  var img = fs.readFileSync('images/sparkly.jpg');
  res.writeHead(200, {'Content-Type': 'image/jpg' });
  res.end(img, 'binary');
});

router.get('/config', function(req, res) {
  res.send('This will be to retrieve a given config JSON');
});

router.post('/config', function(req, res) {
  res.send('This will be to save a given config JSON');
});

router.delete('/config', function(req, res) {
  res.send('This will be to delete a given config JSON');
});


module.exports = router;
