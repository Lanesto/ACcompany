const jwt    = require('jsonwebtoken')
const crypto = require('crypto')
const config = require('./config')

module.exports.generateSalt = function() {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(64, (err, buf) => {
      if (err) {
        // failed to create random
        return reject(err)
      }
      resolve(buf.toString('base64'))
    })
  })
}

module.exports.processPW = function(password, salt) {
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(password, salt, config.crypto.iteration, 64, config.crypto.digest, (err, key) => {
      if (err) {
        // failed to create digest
        return reject(err)
      }
      resolve(key.toString('base64'))
    })
  })
}

module.exports.createAccessToken = function(body) {
  return jwt.sign({
    ...body
  }, config.jwt.access.secret, config.jwt.access.options)
}

module.exports.verifyAccessToken = function(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, config.jwt.access.secret, (err, decoded) => {
      if (err)
        return reject(err)
      resolve(decoded)
    })
  })
}

module.exports.createRefreshToken = function(body) {
  return jwt.sign({
    ...body
  }, config.jwt.refresh.secret, config.jwt.refresh.options)
}

module.exports.verifyRefreshToken = function(refreshToken) {
  return new Promise((resolve, reject) => {
    jwt.verify(refreshToken, config.jwt.refresh.secret, (err, decoded) => {
      if (err)
        return reject(err)
      resolve(decoded)
    })
  })
}

