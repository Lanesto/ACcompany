var mysql  = require('mysql')
var config = require('./config')

// TODO:
// using connection pool, implement functions for query execution
// + prevent sql injection


module.exports.connectionTest = function () { // node.js 
    var conn = mysql.createConnection(config.dev)
    conn.connect()
    conn.query('SELECT * FROM Test', function (err, rows, fields) {
        if (err) 
            console.log(`MySQL connectin failed: ${err}`)
        else 
            console.log(`MySQL connection successful: loaded ${rows.length} rows`)
    })
    conn.end()
}
