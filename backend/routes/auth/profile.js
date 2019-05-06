const express = require('express')
const router  = express.Router()
const { Database } = require('@database')
const { ensureAuthForResource } = require('@oauth2_0')
const { CustomError } = require('@src/error')

/*
  GET auth/profile
  response with user's privates
*/
router.get('/', ensureAuthForResource, function(req, res, next) {
  let db = new Database()
  // TODO: Specify selection attributes
  db.execute(`
  SELECT *
  FROM user WHERE id = ?`,
  [req.user.id])
  .then(results => {
    if (results.length !== 1)
      throw new CustomError('DatabaseError', 'Database malfunction')

    res.json(results[0])
  })
  .catch(err => {
    if (err.name === 'DatabaseError') {
      res.status(500).send({ message: err.message })
    }
    else {
      res.status(500).send({ message: 'Unknown server error' })
    }
  })
  .finally(() => db.close())
})

module.exports = router
