const express = require('express')
const router  = express.Router()
const { Database } = require('@database')
const { ensureAuthForResource } = require('@oauth2_0')
const { CustomError } = require('@src/error')

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
  let db = new Database()
  db.execute(`
  SELECT id, content, date_created
  FROM comment
  WHERE postID = ? AND groupID <=> ?
  LIMIT ?, ?`, 
  [post, group, start, start + len])
  .then(results => {
    res.status(200).json(results)
  })
  .catch(err => {
    res.status(400).send({ message: 'Given request has error, maybe id of post or group is invalid' })
  })
  .finally(() => db.close())
})

/*
  POST api/comment
  body {
    post
    group
    content
  }
*/
router.post('/', ensureAuthForResource, function(req, res, next) {
  let { post, group, content } = req.body
  // preprocess
  post  = parseInt(post) || null
  group = (group === 'null') ? null : parseInt(group)
  // main
  let db = new Database()
  db.execute(`
  INSERT INTO comment(postID, userID, groupID, content)                   
  VALUES(?, ?, ?, ?)`, 
  [post, req.user.id, group, content])
  .then(results => {
    if (results.affectedRows === 1) {
      res.status(201).send({
        message: 'Created new comment successfully', 
        commentID: results.insertId
      })
    } else throw new CustomError('DatabaseError', 'Failed to create a comment, could be problem of data domain')
  })
  .catch(err => {
    if (err.name === 'TokenExpiredError') {
      res.status(401).send({ message: 'Requires login ahead to make a new comment' })
    }
    else if (err.name === 'DatabaseError') {
      res.status(500).send({ message: err.message })
    }
    else {
      res.status(400).send({ message: 'Given request could be including invalid informations'})
    }
  })
  .finally(() => db.close())
})

/*
  DELETE api/comment/<comment_id>
  params {
    comment
  }
*/
router.delete('/:comment', ensureAuthForResource, function(req, res, next) {
  let { comment } = req.params
  // preprocess
  comment = parseInt(comment)
  // main
  let db = new Database()
  db.execute(`
  DELETE FROM comment 
  WHERE id = ? AND userID = ?`,
  [comment, req.user.id])
  .then(results => {
    if (results.affectedRows === 1) {
      res.status(200).send({ message: 'Deleted a comment successfully' })
    } 
    else throw new CustomError('ResourceDoesNotExist', 'Comment does not exists or is not yours')
  })
  .catch(err => {
    if (err.name === 'TokenExpiredError') {
      res.status(401).send({ message: 'Need to login ahead to delete your comment' })
    }
    else if (err.name === 'ResourceDoesNotExist') {
      res.status(400).send({ message: err.message })
    }
    else {
      res.status(520).send({ message: 'Unknown error occurred'})
    }
  })
  .finally(() => db.close())
})

module.exports = router
