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
  db.execute(`
  SELECT u.id, IFNULL(u.account, oa.sns_id) AS account, IFNULL(oa.sns_type, 'local') AS type, u.nickname, u.email, u.name, u.gender, u.age,
         u.date_created, oa.sns_date_connected
  FROM user u LEFT JOIN oauth2_0 oa ON u.ID = oa.ID
  WHERE u.id = ?`,
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
