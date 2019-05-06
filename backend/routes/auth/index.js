const express = require('express')
const router  = express.Router()

router.use('/login', require('./login/index'))
router.use('/logout', require('./logout'))
router.use('/register', require('./register'))
router.use('/profile', require('./profile'))

module.exports = router
