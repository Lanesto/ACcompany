const express = require('express')
const router  = express.Router()
const { Database } = require('@database')

/*
  GET api/company
  returns company, its departments and boards it is using
*/
router.get('/', function(req, res, next) {
  let db = new Database()
  let exCompanyInfo, exDepts, exBoards
  db.execute(`SELECT name, logo FROM company LIMIT 1`, [])
  .then(results => {
    exCompanyInfo = results[0]
    return db.execute(`SELECT id, parent_id, name FROM department ORDER BY name ASC`, [])
  })
  .then(results => {
    exDepts = results
    return db.execute('SELECT id, name FROM board WHERE group_id <=> null', [])
  })
  .then(results => {
    exBoards = results
    return db.execute(`
    SELECT u.id, u.profile, u.name, u.email, u.position, u.dept_id
    FROM user u JOIN department d ON u.dept_id    = d.ID
                JOIN company    c ON d.company_id = c.ID
    WHERE c.ID = ?`, [0]) // for future
  })
  .then(results => {
    res.status(200).json({
      ...exCompanyInfo,
      depts    : exDepts,
      boards   : exBoards,
      employees: results
    })
  })
  .catch(err => {
    res.status(500).send({ message: 'Server or database error, contact admin for help' })
  })
  .finally(() => db.close())
})

module.exports = router
