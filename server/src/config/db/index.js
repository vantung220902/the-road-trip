var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'tung',
    password: '12341234',
    database: 'do_an_2',
    multipleStatements: true,
});

connection.connect((err) => {
    if (err) console.log(err);
});

module.exports = connection;
