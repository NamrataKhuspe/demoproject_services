var mysql = require('mysql');
var db = require('./config.json')


var connection = mysql.createConnection({
    "connectionLimit": 50,
    "host": db.dbcore.host,
    "user": db.dbcore.user,
    "password": db.dbcore.password,
    "database": db.dbcore.database
});
// connection.connect(); 
module.exports.execute_query = async (query) => {
    return new Promise((result, reject) => {
        connection.query(query, function (err, rows, fields) {
            // console.log("query - > " , query);
            if (err) {
                console.log("errror -> " , err);
                result(err);
            };
            // console.info('DB_CONNECTION------->>11', `Query: ${query}`);
            // console.info('DB_CONNECTION', `Rows--->11 : ${JSON.stringify(rows)}`);
            console.log("\n\n\n rows--- ", rows);
            result(rows);
        });
    });
}