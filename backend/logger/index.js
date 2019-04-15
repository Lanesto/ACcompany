const { createLogger, format, transports } = require('winston')
const { combine, timestamp, printf } = format

const logger = createLogger({
  level: 'info',
  transports: [
    new transports.File({ 
      filename: 'logs.log',
      format: combine(
        timestamp(),
        printf(({ level, message, timestamp }) => { return `${timestamp} ${level} - ${message}` })
      ),
    })
  ],
  exceptionHandlers: [
    new transports.File({ filename: 'exceptions.log' })
  ]
})

if (process.env.NODE_ENV !== 'production') {
  logger.add(new transports.Console({
    format: printf(({ level, message }) => `${new Date().toFormat('YY-MM-DD HH24:MI:SS')} ${level.toUpperCase()} - ${message}`)
  }))
}

module.exports = logger
