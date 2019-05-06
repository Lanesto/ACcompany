const { createLogger, format, transports } = require('winston')
const { combine, timestamp, printf } = format

const logger = createLogger({
  level: 'info',
  transports: [
    new transports.File({ 
      filename: 'logs.log',
      format: combine(
        timestamp(),
        printf(({ level, message, timestamp }) => {
          return `[${timestamp} ${level.toUpperCase()}] ${message}` 
        })
      )
    }),
    new transports.Console({
      format: combine(
        timestamp(),
        printf(({ level, message }) => {
          return `[${new Date().toFormat('HH24:MI:SS')} ${level.toUpperCase()}] ${message}`
        })
      )
    })
  ]
})

// for uncaughts only
const e_logger = createLogger({
  level: 'error',
  transports: [
    new transports.File({
      filename: 'exceptions.log',
      format: combine(
        timestamp(),
        printf(({ level, message, timestamp }) => {
          return `[${timestamp} ${level.toUpperCase()}] ${message}` 
        })
      )
    })
  ]
})

// later hook other exceptions, such as unhandledRejection
process.on('uncaughtException', err => {
  e_logger.error(`Uncaught ${err.name}\r\n└ (Stacktrace) ${err.stack.replace(/\n/gi, '\r\n')}`)
})

module.exports = logger
