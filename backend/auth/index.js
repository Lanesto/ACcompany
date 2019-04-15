const jwt    = require('jsonwebtoken')
const crypto = require('crypto')
const config = require('./config')
const logger = require('@logger')

module.exports.generateSalt = function() {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(64, (err, buf) => {
      if (err) {
        // failed to create random
        logger.info("Couldn't create random")
        return reject(err)
      }
      logger.info('Created salt')
      resolve(buf.toString('base64'))
    })
  })
}

module.exports.processPW = function(password, salt) {
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(password, salt, config.crypto.iteration, config.crypto.keylen, config.crypto.digest, (err, key) => {
      if (err) {
        // failed to create digest
        logger.error("Couldn't process password properly")
        return reject(err)
      }
      logger.info('Processed password with salt')
      resolve(key.toString('base64'))
    })
  })
}

module.exports.createAccessToken = function(body) {
  let token = jwt.sign({
    ...body
  }, config.jwt.access.secret, config.jwt.access.options)
  logger.info('Created new access token')
  return token
}

module.exports.verifyAccessToken = function(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, config.jwt.access.secret, (err, decoded) => {
      if (err) {
        return reject(err)
      }
      resolve(decoded)
    })
  })
}

module.exports.createRefreshToken = function(body) {
  let token = jwt.sign({
    ...body
  }, config.jwt.refresh.secret, config.jwt.refresh.options)
  logger.info('Created new refresh token')
  return token
}

module.exports.verifyRefreshToken = function(refreshToken) {
  return new Promise((resolve, reject) => {
    jwt.verify(refreshToken, config.jwt.refresh.secret, (err, decoded) => {
      if (err) {
        return reject(err)
      }
      resolve(decoded)
    })
  })
}

