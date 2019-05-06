require('module-alias/register') // aliases at package.json
require('date-utils')
require('@oauth2_0').init()

const express       = require('express')
const config        = require('@config').app
const path          = require('path')
const cookieParser  = require('cookie-parser')
const cookieSession = require('cookie-session')
const morgan        = require('morgan')
const passport      = require('passport')
const createError   = require('http-errors')
const logger        = require('@logger')

// view engine setup
const app = express()
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(morgan('dev'))
app.use(cookieParser())
app.use(cookieSession({ ...config.cookie }))
app.use(passport.initialize())
app.use(passport.session())

// routes
app.use('/', require('./routes/index'))

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

logger.info('Application is running')
console.table(require('express-list-endpoints')(app));


module.exports = app
