const crypto = require('crypto')
const config = require('@config').auth
const logger = require('@logger')

module.exports.generateSalt = function() {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(64, (err, buf) => {
      if (err) {
        // failed to create random
        logger.error("Failed to create random")
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
