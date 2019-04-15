const express  = require('express')
const router   = express.Router()
const database = require('@database')
const auth     = require('@auth')
const error    = require('@src/error')

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
  let db = new database.Database()
  db.execute(`
  SELECT p.id, p.title, p.content, p.date_created, u.account
  FROM post AS p
  JOIN user AS u ON p.userID = u.id
  WHERE p.id = ?`, 
  [post])
  .then(results => {
    res.status(200).json(results[0])
  }).catch(err => {
    res.status(400).send({ message: 'Given request has error, possibly designating post does not exist' })
  }).finally(() => {
    db.close()
  })
  delete db
})

/*
  POST api/post
  header {
    'Authorization': `Bearer ${accessToken}`
  }
  body {
    board
    title
    content
  }
  Create a new post
*/
router.post('/', function(req, res, next) {
  let accessToken = req.get('Authorization').split(' ')[1]
  let { board, title, content } = req.body
  // preprocess
  board = (board === 'null') ? null : parseInt(board)
  // main
  let db = new database.Database()
  auth.verifyAccessToken(accessToken)
  .then(decoded => {
    return db.execute(`
    INSERT INTO post(boardID, userID, title, content) 
    VALUES(?, (SELECT id FROM user WHERE account = ?), ?, ?)`, 
    [board, decoded.id, title, content])
  }).then(results => {
    if (results.affectedRows === 1)
      res.status(201).send({
        message: 'Created new post successfully', 
        postID: results.insertId
      })
    else throw new error.CustomError('DatabaseError', "Couldn't create a post, may originated from data domain")
  }).catch(err => {
    if (err.name === 'TokenExpiredError') {
      res.status(401).send({ message: 'Authorization failed, login please' })
    }
    else if (err.name === 'DatabaseError') {
      res.status(500).send({ message: err.message })
    } 
    else {
      res.status(400).send({ message: 'Given request might has some errors' })
    }
  }).finally(() => {
    db.close()
  })
  delete db
})

/*
  DELETE api/post
  header {
    'Authorization': `Bearer ${accessToken}`
  }
  params {
    post
  }
*/
router.delete('/:post', function(req, res, next) {
  let accessToken = req.get('Authorization').split(' ')[1]
  let { post } = req.params
  // preprocess
  post = parseInt(post) || null
  // main
  let db = new database.Database()
  auth.verifyAccessToken(accessToken)
  .then(decoded => {
    return db.execute(`
    DELETE FROM post
    WHERE id = ? AND (SELECT userID FROM user WHERE account = ?)`, [post, decoded.id])
  }).then(results => {
    if (results.affectedRows === 1) {
      res.status(200).send({
        message: 'Deleted a post successfully', 
      })
    } else throw new error.CustomError('ResourceDoesNotExist', 'Post does not exists')
  }).catch(err => {
    if (err.name === 'TokenExpiredError') {
      res.status(401).send({ message: 'Please login to delete your post' })
    }
    else if (err.name === 'ResourceDoesNotExist') {
      res.status(400).send({ message: err.message })
    }
    else {
      res.status(520).send({ message: 'Unknown error occurred'})
    }
  }).finally(() => {
    db.close()
  })
  delete db
})

module.exports = router
