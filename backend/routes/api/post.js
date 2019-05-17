const express = require('express')
const router  = express.Router()
const { Database } = require('@database')
const { ensureAuthForResource } = require('@oauth2_0')
const { CustomError }    = require('@src/error')

/*
  GET api/post
  query {
    _basetime // for soft-load
    board
    start
    len (max 100)
  }
  return posts of a specific board 
*/
router.get('/', function(req, res, next) {
  let { _basetime, board, start, len } = req.query
  // preprocess
  _basetime = new Date(_basetime)
  board     = parseInt(board) || null
  start     = (start < 0) ? 0 : parseInt(start)
  len       = parseInt(len) - 1 || 0
  if      (len <  0) len = 0
  else if (len > 99) len = 99
  // main
  let db = new Database()
  db.execute(`
  SELECT tmp.id,
         tmp.title,
         tmp.date_created,
         tmp.date_modified,
         tmp.nickname,
         tmp.name AS username
  FROM (
    (SELECT p.*, u.nickname, u.name
    FROM post p
    JOIN user u ON p.user_id = u.id
    WHERE p.board_id = ? AND (p.date_created > ? OR p.date_modified > ?)
    ORDER BY p.date_created DESC)

    UNION

    (SELECT p.*, u.nickname, u.name
    FROM post p
    JOIN user u ON p.user_id = u.id
    WHERE p.board_id = ? AND p.date_created <= ?
    ORDER BY p.date_created DESC
    LIMIT ?, ?) 
  ) tmp`, 
  [board, _basetime, _basetime, board, _basetime, start, start + len])
  .then((results) => {
    res.status(200).json({
      _basetime: new Date(),
      posts   : results
    })
  })
  .catch(err => {
    res.status(400).send({ message: 'Given request has error, invalid board or inappropriate range of count' })
  })
  .finally(() => db.close())
})

/*
  GET api/post/<post_id>
  params {
    post
  }
  return a post detail of a board
*/
router.get('/:post', function(req, res, next) {
  let { post } = req.params
  // preprocess
  post = parseInt(post) || null
  // main
  let db = new Database()
  db.execute(`
  SELECT p.id, p.title, p.content, p.date_created, p.date_modified, u.nickname, u.name AS username
  FROM post AS p
  JOIN user AS u ON p.user_id = u.id
  WHERE p.id = ?`, 
  [post])
  .then(results => {
    res.status(200).json(results[0])
  })
  .catch(err => {
    res.status(400).send({ message: 'Given request has error, possibly designating post does not exist' })
  })
  .finally(() => db.close())
})

/*
  POST api/post
  body {
    board
    title
    content
  }
  Create a new post
*/
router.post('/', ensureAuthForResource, function(req, res, next) {
  let { board, title, content } = req.body
  // preprocess
  board = (board === 'null') ? null : parseInt(board)
  // main
  let db = new Database()
  db.execute(`
  INSERT INTO post(board_id, user_id, title, content) 
  VALUES(?, ?, ?, ?)`, 
  [board, req.user.id, title, content])
  .then(results => {
    if (results.affectedRows === 1)
      res.status(201).send({
        message: 'Created new post successfully', 
        postID: results.insertId
      })
    else throw new CustomError('DatabaseError', "Couldn't create a post, may originated from data domain")
  })
  .catch(err => {
    if (err.name === 'TokenExpiredError') {
      res.status(401).send({ message: 'Authorization failed, login please' })
    }
    else if (err.name === 'DatabaseError') {
      res.status(500).send({ message: err.message })
    } 
    else {
      console.log(err)
      res.status(400).send({ message: 'Given request might has some errors' })
    }
  })
  .finally(() => db.close())
})

/*
  DELETE api/post
  params {
    post
  }
*/
router.delete('/:post', ensureAuthForResource, function(req, res, next) {
  let { post } = req.params
  // preprocess
  post = parseInt(post) || null
  // main
  let db = new Database()
  db.execute(`DELETE FROM post WHERE id = ? AND user_id = ?`, [post, req.user.id])
  .then(results => {
    if (results.affectedRows === 1) {
      res.status(200).send({ message: 'Deleted a post successfully' })
    } 
    else throw new CustomError('ResourceDoesNotExist', 'Post does not exists or is not yours')
  })
  .catch(err => {
    if (err.name === 'TokenExpiredError') {
      res.status(401).send({ message: 'Please login to delete your post' })
    }
    else if (err.name === 'ResourceDoesNotExist') {
      res.status(400).send({ message: err.message })
    }
    else {
      res.status(520).send({ message: 'Unknown error occurred'})
    }
  }).finally(() => db.close())
})

module.exports = router
