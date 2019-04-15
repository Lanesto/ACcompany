const express  = require('express')
const router   = express.Router()
const database = require('@database')
const logger   = require('@logger')

/*
  GET api/board/<board_id>
  params {
    board
  }
  query {
    start
    len (max 100)
  }
  return posts of a board 
*/
router.get('/:board/', function(req, res, next) {
  let { board } = req.params
  let { start, len } = req.query
  // preprocess
  board = parseInt(board) || null
  start = (start < 0) ? 0 : parseInt(start)
  len   = parseInt(len) - 1 || 0
  if      (len <  0) len = 0
  else if (len > 99) len = 99
  // main
  let db = new database.Database()
  db.execute(`
  SELECT p.id, p.title, p.date_created, u.account
  FROM post AS p
  JOIN user AS u ON p.userID = u.id
  WHERE p.boardID = ?
  ORDER BY p.date_created ASC
  LIMIT ?, ?`, 
  [board, start, start + len])
  .then(results => {
    res.status(200).json(results)
  }).catch(err => {
    res.status(400).send({ message: 'Given request has error, invalid board or inappropriate range of count' })
  }).finally(() => {
    db.close()
  })
  delete db
})

module.exports = router
