const mysql = require('mysql');

// connection to mysql database
// currently connects to locally hosted database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'group1b',
    database: 'groupproject'
});

connection.connect();

// export functions to be used by RESTful API calls
module.exports = {
    // get all associates
    getAllAssociates: async result => {
        connection.query('SELECT * FROM SalesAssociates', function(err, rows){
            if (err) throw err;
            console.log('rows: ', rows);
            result(rows);
        });
    },

    // get one associate by AssociateID
    getOneAssociate: async (AssociateID, result) => {
        connection.query('SELECT * FROM SalesAssociates WHERE AssociateID = ?', [AssociateID], function(err, rows){
            if (err) throw err;
            console.log('rows: ', rows);
            result(rows);
        });
    },

    // delete one associate record by AssociateID
    deleteAssociate: async (AssociateID, result) => {
        connection.query('DELETE FROM SalesAssociates WHERE AssociateID = ?', [AssociateID], function(err, rows){
            if (err) throw err;
            console.log('Deleted');
            result(rows);
        });
    },

    // add an associate record
    addAssociate: async (AssociateID, Username, Password, Name, Commission, Address, result) => {
        connection.query(
            'INSERT INTO SalesAssociates\
            (AssociateID, Username, Pass, Name, Commission, Address)\
            VALUES (?, ?, ?, ?, ?, ?)', 
            [AssociateID, Username, Password, Name, Commission, Address], 
            function(err, rows){
                if (err) throw err;
                console.log('Added');
                result(rows);
        });
    },

    // update an existing associate record
    updateAssociate: async (oldAssociateID, newAssociateID, Username, Password, Name, Commission, Address, result) => {
        connection.query(
            'UPDATE SalesAssociates\
                SET AssociateID = ?,\
                    Username = ?,\
                    Pass = ?,\
                    Name = ?,\
                    Commission = ?,\
                    Address = ?\
                WHERE AssociateID = ?', 
            [newAssociateID, Username, Password, Name, Commission, Address, oldAssociateID], 
            function(err, rows){
                if (err) throw err;
                console.log('Added');
                result(rows);
        });
    },
    
}