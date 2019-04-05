var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.send(__dirname + '\nindex' + JSON.stringify(req.query));
});

router.use('/board', require('./board'))
router.use('/company', require('./company'))
router.use('/circle', require('./circle'))
router.use('/widget', require('./widget'))
router.use('/user', require('./user'))

module.exports = router;
