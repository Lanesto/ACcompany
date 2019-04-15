const express  = require('express')
const router   = express.Router()
const database = require('@database')

/*
  GET api/user/<user_id>
  params {
    user
  }
  return informations about user
*/
router.get('/:user/', function(req, res, next) {
  let { user } = req.params
  let db = new database.Database()
  db.execute(`
  SELECT u.account, u.email, u.name, u.gender, u.age, u.date_created, d.name dept
  FROM user AS u
  LEFT JOIN department AS d ON u.deptID = d.id
  WHERE u.account = ?`, 
  [user])
  .then(results => {
    res.status(200).json(results[0])
  }).catch(err => {
    res.status(400).send({ message: "Request failed, couldn't find user" })
  }).finally(() => {
    db.close()
  })
  delete db
})

module.exports = router
