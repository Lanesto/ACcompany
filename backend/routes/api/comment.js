const express = require('express')
const router  = express.Router()
const { Database } = require('@database')
const { ensureAuthForResource } = require('@oauth2_0')
const { CustomError } = require('@src/error')

/*
  GET api/comment
  query {
    _basetime
    post
    group
    start
    len (max 100)
  }
  return comments of a specific post
*/
router.get('/', function(req, res, next) {
  let { _basetime, post, group, start, len } = req.query
  // preprocess
  _basetime = new Date(_basetime)
  group     = parseInt(group) || null
  start     = (start < 0) ? 0 : parseInt(start)
  len       = parseInt(len) - 1 || 0
  if      (len <  0) len = 0
  else if (len > 99) len = 99
  // main
  let db = new Database()
  db.execute(`
  SELECT tmp.id,
         tmp.group_id,
         tmp.content,
         COUNT(c2.id) AS count_subcomments,
         tmp.date_created,
         tmp.date_modified,
         tmp._user_id AS user_id,
         tmp.nickname,
         tmp.name AS username
  FROM (
    (SELECT c.*, u.id AS _user_id, u.nickname, u.name
    FROM comment c
    JOIN user    u ON c.user_id = u.id
    WHERE (c.post_id = ? AND c.group_id <=> ?) AND (c.date_created > ? OR c.date_modified > ?)
    ORDER BY c.date_created DESC)

  UNION

  (SELECT c.*, u.id AS _user_id, u.nickname, u.name
    FROM comment c
    JOIN user    u ON c.user_id = u.id
    WHERE (c.post_id = ? AND c.group_id <=> ?) AND c.date_created <= ?
    ORDER BY c.date_created DESC
    LIMIT ?, ?)
  ) tmp
  LEFT JOIN comment c2 ON tmp.id = c2.group_id
  GROUP BY tmp.id`,
  [post, group, _basetime, _basetime, post, group, _basetime, start, start + len])
  .then(results => {
    res.status(200).json({
      _basetime: new Date(),
      comments : results
    })
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
    user
    content
  }
*/
router.post('/', ensureAuthForResource, function(req, res, next) {
  let { post, group, content } = req.body
  // preprocess
  post  = parseInt(post) || null
  group = parseInt(group) || null
  // main
  let db = new Database()
  db.execute(`
  INSERT INTO comment(post_id, group_id, user_id, content)                   
  VALUES(?, ?, ?, ?)`, 
  [post, group, req.user.id, content])
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
  WHERE id = ? AND user_id = ?`,
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
