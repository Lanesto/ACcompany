const mysql  = require('mysql')
const config = require('@config').database
const logger = require('@logger')
const { CustomError } = require('@src/error')

module.exports.Database = class {
  constructor() {
    try {
      this.connection = mysql.createConnection(config.local)
      logger.info('MySQL database connection established')
    }
    catch(err) {
      this.connection = null
      logger.error('MySQL connection failed')
    }
  }
  execute(query, params) {
    return new Promise((resolve, reject) => {
      if (!this.connection)
        return reject(new CustomError('ConnectionNotExist', 'Database connection does not exist'))
      this.connection.query(query, params, (err, results, fields) => {
        if (err) {
          logger.error(`MySQL ${err.code} ${err.errno} ${err.fatal ? 'NOT-FATAL' : 'FATAL'} (${err.sqlState})\r\n└ ${err.sqlMessage}\r\n└ SQL: ${err.sql}`)
          return reject(err)
        }
        // make list of tables into single line string
        let affectedTables = fields.length > 1 ? `${fields[0].db}.${fields[0].table}`
                           : fields.map(field => `${field.db}.${field.table}`)
                             .filter((field, index, array) => array.indexOf(field) === index)
                             .join(', ')
      if (results.affectedRows) {
          logger.info(`DB changed ${results.affectedRows} rows on ${affectedTables}`)
        } 
        else if (results.length) {
          logger.info(`DB fetched ${results.length} rows successfully from ${affectedTables}`)
        }
        else {
          logger.info(`DB executed query on ${affectedTables} but made no changes`)
        }
        resolve(results, fields)
      })
    })
  }
  close() {
    return new Promise((resolve, reject) => {
      if (!this.connection)
        return reject(new CustomError('ConnectionNotExist', 'Database connection does not exist'))
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
