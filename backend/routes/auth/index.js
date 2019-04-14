const express = require('express')
const router = express.Router()

router.post('/', function(req, res, next) {
  res.send(__dirname + '\nindex' + JSON.stringify(req.body))
})

router.use('/login', require('./login'))
router.use('/refresh', require('./refresh'))
router.use('/register', require('./register'))
router.use('/verify', require('./verify'))

module.exports = router
