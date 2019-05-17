const express = require('express')
const router  = express.Router()
const { Database } = require('@database')

router.get('/', function(req, res, next) {
  res.send(__dirname + '\nboard' + JSON.stringify(req.query))
})

module.exports = router
