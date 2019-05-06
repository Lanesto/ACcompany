const express = require('express')
const router  = express.Router()

// user login connections are stored in cookie
router.use('/local', require('./local'))
router.use('/naver', require('./naver'))
router.use('/kakao', require('./kakao'))

module.exports = router
