const express = require('express')
const router  = express.Router()

// forces SNS login popup close
router.get('/', function(req, res, next) {
  res.send('<script>window.close()</script>')
})

module.exports = router
