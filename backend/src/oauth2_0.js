const passport = require('passport')
const config   = require('@config').oauth2_0
const logger   = require('@logger')
const { Database } = require('@database')
const { processPW } = require('@auth')
const { CustomError } = require('@src/error')

function serializer(user, done) {
  done(null, user)
}

function deserializer(user, done) {
  done(null, user)
}

function localLogin(info, done) {
  let { id, password } = info
  logger.info(`Local login request for ${id}`)
  let db = new Database()
  db.execute('SELECT salt FROM user WHERE account = ?', [id])
  .then(results => {
    if (!results || results.length != 1)
      throw new CustomError('InvalidUserError', 'User informations are broken, or malformed')

    return processPW(password, results[0].salt)
  })
  .then(digest => {
    return db.execute(`SELECT id FROM user WHERE account = ? AND password = ?`, 
    [id, digest])
  })
  .then(results => {
    if (results.length !== 1)
      throw new CustomError('InvalidUserError', 'Wrong password given')

    done(null, { id: results[0].id })
  })
  .catch(err => done(err))
  .finally(() => db.close())
}

function SNSLogin(info, done) {
  logger.info(`Incoming OAuth 2.0 Request (${info.authType})`)
  let db = new Database()
  db.execute(
  `SELECT COUNT(id) AS n FROM oauth2_0 WHERE sns_type = ? AND sns_id = ?`,
  [info.authType, info.id])
  .then(results => {
    if (results[0].n === 0) { 
      // if sns not connected yet, then register first
      // requires MySQL multipleStatements option to be true
      db.execute(`
      INSERT INTO user(nickname) VALUES(?);
      INSERT INTO oauth2_0(id, sns_id, sns_type) VALUES(last_insert_id(), ?, ?);`,
      [info.nickname, info.id, info.authType])
    }
    return db.execute(`SELECT id FROM oauth2_0 WHERE sns_type = ? AND sns_id = ?`,
    [info.authType, info.id])
  })
  .then(results => {
    // then login
    if (results.length !== 1) 
      throw new CustomError('DatabaseError', 'Internal database error')

    done(null, { id: results[0].id })
  })
  .catch(err => done(err))
  .finally(() => db.close())
}

module.exports.ensureAuthForResource = function(req, res, next) {
  if (req.isAuthenticated())
    return next()
  res.status(401).send({ message: 'You need to login' })
}

module.exports.isSupported = function(authType) {
  // returns whether given OAuth 2.0 type is supported on this server
  return ['naver', 'kakao'].indexOf(authType) > -1
}

module.exports.init = function() {
  passport.serializeUser(serializer)
  passport.deserializeUser(deserializer)

  // Local login
  passport.use('local', new (require('passport-local')).Strategy({
    usernameField: 'id',
    passwordField: 'password',
  }, (id, password, done) => {
    localLogin({ id, password }, done)
  }))

  // Naver login
  passport.use('naver', new (require('passport-naver')).Strategy({
    ...config.naver
  }, function(accessToken, refreshToken, profile, done) {
    SNSLogin({
      authType: 'naver',
      id      : profile._json.id,
      nickname: profile._json.nickname
    }, done)
  }))

  // Kakao login
  passport.use('kakao', new (require('passport-kakao')).Strategy({
    ...config.kakao
  }, function(accessToken, refreshToken, profile, done) {
    SNSLogin({
      authType: 'kakao',
      id      : profile._json.id,
      nickname: profile._json.properties.nickname
    }, done)
  }))
}
