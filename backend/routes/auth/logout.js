const express = require('express')
const router  = express.Router()

/*
  GET auth/logout
  process passport logout 
*/
router.get('/', function(req, res, next) {
  req.logout()
  res.redirect('/')
})

module.exports = router
