var express = require('express')
var router  = express.Router()

router.use('/company', require('./company'))
router.use('/circle', require('./circle'))
router.use('/board', require('./board'))
router.use('/post', require('./post'))
router.use('/comment', require('./comment'))
router.use('/user', require('./user'))
router.use('/widget', require('./widget'))

module.exports = router
