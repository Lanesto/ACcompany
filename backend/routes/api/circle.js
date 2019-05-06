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
  SELECT id, name, date_created
  FROM circle
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
  SELECT b.id, b.name, b.date_created
  FROM board  AS b
  JOIN circle AS c ON b.groupID = c.id
  WHERE c.id = ?`, 
  [circle])
  .then(results => {
    exBoards = results
    return db.execute(`
    SELECT id, name, date_created
    FROM circle
    WHERE id = ?`, 
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
