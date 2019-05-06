const express = require('express')
const router  = express.Router()
const { Database } = require('@database')

/*
  GET api/company
  returns company, its departments and other informations
*/
router.get('/', function(req, res, next) {
  let db = new Database()
  let exCompanyInfo
  db.execute(`SELECT name, logo FROM company LIMIT 1`, [])
  .then(results => {
    exCompanyInfo = results[0]
    return db.execute(`SELECT id, parentID, name FROM department ORDER BY name ASC`, [])
  }).then(results => {
    res.status(200).json({
      ...exCompanyInfo,
      depts: results
    })
  })
  .catch(err => {
    res.status(500).send({ message: 'Server or database error, contact admin for help' })
  })
  .finally(() => db.close())
})

module.exports = router
