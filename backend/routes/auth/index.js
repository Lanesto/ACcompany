const express = require('express')
const router = express.Router()

router.use('/login', require('./login'))
router.use('/logout', require('./logout'))
router.use('/refresh', require('./refresh'))
router.use('/register', require('./register'))
router.use('/verify', require('./verify'))

module.exports = router
