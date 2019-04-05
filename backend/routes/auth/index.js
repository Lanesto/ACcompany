var express = require('express');
var router = express.Router();

// auth should use post for security
// which login method should be used?: session, cookie, token
// auth route is incomplete
router.post('/', function(req, res, next) {
  res.send(__dirname + '\nindex' + JSON.stringify(req.body));
});

router.use('/login', require('./login'))
router.use('/logout', require('./logout'))
router.use('/refresh', require('./refresh'))
router.use('/verify', require('./verify'))

module.exports = router;
