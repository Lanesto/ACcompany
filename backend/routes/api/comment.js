const express  = require('express')
const router   = express.Router()
const database = require('@database')
const auth     = require('@auth')
const error    = require('@src/error')

/*
  GET api/comment
  query {
    post
    group
    start
    len (max 100)
  }
  return comments of a specific post
*/
router.get('/', function(req, res, next) {
  let { post, group, start, len } = req.query
  // preprocess
  group = parseInt(group) || null
  start = (start < 0) ? 0 : parseInt(start)
  len   = parseInt(len) - 1 || 0
  if      (len <  0) len = 0
  else if (len > 99) len = 99
  // main
  let db = new database.Database()
  db.execute(`
  SELECT id, content, date_created
  FROM comment
  WHERE postID = ? AND groupID <=> ?
  LIMIT ?, ?`, 
  [post, group, start, start + len])
  .then(results => {
    res.status(200).json(results)
  }).catch(err => {
    res.status(400).send({ message: 'Given request has error, maybe id of post or group is invalid' })
  }).finally(() => {
    db.close()
  })
  delete db
})

/*
  POST api/comment
  header {
    'Authorization': `Bearer ${accessToken}`
  }
  body {
    post
    group
    content
  }
*/
router.post('/', function(req, res, next) {
  let accessToken = req.get('Authorization').split(' ')[1]
  let { post, group, content } = req.body
  // preprocess
  post  = parseInt(post) || null
  group = (group === 'null') ? null : parseInt(group)
  // main
  let db = new database.Database()
  auth.verifyAccessToken(accessToken)
  .then(decoded => {
    return db.execute(`
    INSERT INTO comment(postID, userID, groupID, content)                   
    VALUES(?, (SELECT id FROM user WHERE account = ?), ?, ?)`, 
    [post, decoded.id, group, content])
  }).then(results => {
    if (results.affectedRows === 1) {
      res.status(201).send({
        message: 'Created new comment successfully', 
        commentID: results.insertId
      })
    } else throw new error.CustomError('DatabaseError', 'Failed to create a comment, could be problem of data domain')
  }).catch(err => {
    if (err.name === 'TokenExpiredError') {
      res.status(401).send({ message: 'Requires login ahead to make a new comment' })
    }
    else if (err.name === 'DatabaseError') {
      res.status(500).send({ message: err.message })
    }
    else {
      res.status(400).send({ message: 'Given request could be including invalid informations'})
    }
  }).finally(() => {
    db.close()
  })
  delete db
})

/*
  DELETE api/comment/<comment_id>
  header {
    'Authorization': `Bearer ${accessToken}`
  }
  params {
    comment
  }
*/
router.delete('/:comment', function(req, res, next) {
  let accessToken = req.get('Authorization').split(' ')[1]
  let { comment } = req.params
  // preprocess
  comment = parseInt(comment)
  let db = new database.Database()
  auth.verifyAccessToken(accessToken)
  .then(decoded => {
    return db.execute(`
    DELETE FROM comment 
    WHERE id = ? AND userID = (SELECT userID FROM user WHERE account = ?)`,
    [comment, decoded.id])
  }).then(results => {
    if (results.affectedRows === 1) {
      res.status(200).send({
        message: 'Deleted a comment successfully',
      })
    } else throw new error.CustomError('ResourceDoesNotExist', 'Comment does not exists')
  }).catch(err => {
    if (err.name === 'TokenExpiredError') {
      res.status(401).send({ message: 'Need to login ahead to delete your comment' })
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
