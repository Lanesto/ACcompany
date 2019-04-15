const mysql  = require('mysql')
const config = require('./config')
const logger = require('@logger')

module.exports.Database = class {
  constructor() {
    this.connection = mysql.createConnection(config.dev)
    logger.info('Database connection established')
  }
  execute(query, params) {
    return new Promise((resolve, reject) => {
      this.connection.query(query, params, (err, results, fields) => {
        if (err) {
          logger.error(`${err.errno} (${err.sqlState}) ${err.sqlMessage}`)
          return reject(err)
        }
        if (results.affectedRows) {
          logger.info(`Change occurences on ${results.affectedRows} rows`)
        } else if (results.length) {
          logger.info(`Fetched ${results.length} rows successfully`)
        }
        resolve(results, fields)
      })
    })
  }
  close() {
    return new Promise((resolve, reject) => {
      this.connection.end(err => {
        if (err) {
          logger.error('Error occured while terminating DB connection')
          return reject(err)
        }
        resolve()
        logger.info('Database connection terminated')
      })
    })
  }
}
