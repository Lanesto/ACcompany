var express = require('express')
var router  = express.Router()

router.get('/', function(req, res, next) {
  res.send(__dirname + '\nwidget' + JSON.stringify(req.query))
})

module.exports = router
