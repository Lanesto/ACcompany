const express = require('express')
const router  = express.Router()

/*
  GET auth/logout
  process passport logout 
  + be aware:
    on node-mon, when user clicks logout multiple times then the auth is not working properly
    default starts had no same problem
*/
router.get('/', function(req, res, next) {
  req.logout()
  res.redirect('/')
})

module.exports = router
