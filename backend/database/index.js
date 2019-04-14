const mysql  = require('mysql')
const config = require('./config')

module.exports.Database = class {
  constructor() {
    this.connection = mysql.createConnection(config.dev)
  }
  execute(query, params) {
    return new Promise((resolve, reject) => {
      this.connection.query(query, params, (err, results, fields) => {
        if (err) {
          return reject(err)
        }
        resolve(results, fields)
      })
    })
  }
  close() {
    return new Promise((resolve, reject) => {
      this.connection.end(err => {
        if (err) {
          return reject(err)
        }
        resolve()
      })
    })
  }
}
