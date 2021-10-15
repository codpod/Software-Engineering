const mysql = require('mysql');

// connection to mysql database
// this connects to the legacy database that stores customer info
const connection = mysql.createConnection({
    host: 'blitz.cs.niu.edu',
    user: 'student',
    password: 'student',
    database: 'csci467'
});

connection.connect();

// export functions to be used by RESTful API calls
module.exports = {
    // get all customer data
    getAllCustomers: async result => {
        connection.query('SELECT * FROM customers', function(err, rows){
            if (err) throw err;
            console.log('rows: ', rows);
            result(rows);
        });
    }
}