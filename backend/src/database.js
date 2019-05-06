const mysql  = require('mysql')
const config = require('@config').database
const logger = require('@logger')

module.exports.Database = class {
  constructor() {
    this.connection = mysql.createConnection(config.local)
    logger.info('MySQL database connection established', { label: 'MySQL' })
  }
  execute(query, params) {
    return new Promise((resolve, reject) => {
      this.connection.query(query, params, (err, results, fields) => {
        if (err) {
          logger.error(`${err.errno} (${err.sqlState}) ${err.sqlMessage}`)
          return reject(err)
        }
        if (results.affectedRows) {
          logger.info(`DB change occurences on ${results.affectedRows} rows`)
        } 
        else if (results.length) {
          logger.info(`DB fetched ${results.length} rows successfully`)
        }
        else {
          logger.info('DB executed query but made no changes')
        }
        resolve(results, fields)
      })
    })
  }
  close() {
    return new Promise((resolve, reject) => {
      this.connection.end(err => {
        if (err) {
          logger.error('DB error occured while terminating connection')
          return reject(err)
        }
        resolve()
        logger.info('MySQL database connection terminated')
      })
    })
  }
}
