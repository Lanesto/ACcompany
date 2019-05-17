const express = require('express')
const router  = express.Router()
const { Database } = require('@database')

/*
  GET api/circle
  query {
    start
    len (max 100)
  }
  return a list and preview of circles
*/
router.get('/', function(req, res, next) {
  let { start, len } = req.query
  // preprocess
  start = (start < 0) ? 0 : parseInt(start)
  len   = parseInt(len) - 1 || 0
  if      (len <  0) len = 0
  else if (len > 99) len = 99
  // main
  let db = new Database()
  db.execute(`
  SELECT tmp.* 
  FROM (
    SELECT c.id, c.logo, c.name, c.is_exposed, c.is_open, COUNT(m.user_id) AS count_member
    FROM circle c
    LEFT JOIN membership m ON c.id = m.circle_id
    WHERE c.is_exposed
    GROUP BY c.id) tmp
  GROUP BY tmp.id
  LIMIT ?, ?`,
  [start, start + len])
  .then(results => {
    res.status(200).json(results)
  })
  .catch(err => {
    res.status(400).send({ message: 'Unknown errors, might be having problems on database server' })
  })
  .finally(() => db.close())
})

/*
  GET api/circle/<circle_id>
  params {
    circle
  }
  return a detail of a circle and boards it has
*/ 
router.get('/:circle/', function(req, res, next) {
  let { circle } = req.params
  // preprocess
  circle = parseInt(circle) || null
  // main
  let db = new Database()
  let exBoards
  db.execute(`
  SELECT b.id, b.name, b.date_created, b.date_modified
  FROM board b
  JOIN circle c ON b.group_id = c.id
  WHERE c.id = ?`,
  [circle])
  .then(results => {
    exBoards = results
    return db.execute(`
    SELECT tmp.* 
    FROM (
      SELECT c.id, c.logo, c.name, c.is_exposed, c.is_open, c.date_created, c.date_modified, COUNT(m.user_id) AS count_member
      FROM circle c
      LEFT JOIN membership m ON c.id = m.circle_id
      GROUP BY c.id) tmp
    WHERE tmp.id = ?
    GROUP BY tmp.id`,
    [circle])
  }).then(results => {
    res.status(200).json({
      ...results[0],
      boards: exBoards
    })
  })
  .catch(err => {
    res.status(400).send({ message: 'Given request has error, pointing unavailable circle' })
  })
  .finally(() => db.close())
})

module.exports = router
