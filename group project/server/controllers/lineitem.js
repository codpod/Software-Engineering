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
    // get all line items
    getAllLineItems: async result => {
        connection.query('SELECT * FROM LineItems', function(err, rows){
            if (err) throw err;
            console.log('rows: ', rows);
            result(rows);
        });
    },

    // get one line item by combination of LineID and QuoteID
    getOneLineItem: async (LineID, QuoteID, result) => {
        connection.query('SELECT * FROM LineItems WHERE LineID = ? AND QuoteID = ?', [LineID, QuoteID], 
                        function(err, rows){
                            if (err) throw err;
                            console.log('rows: ', rows);
                            result(rows);
        });
    },

    // get all line items associated with one QuoteID
    getLineItemByQuoteID: async (QuoteID, result) => {
        connection.query('SELECT * FROM LineItems WHERE QuoteID = ?', [QuoteID], 
                        function(err, rows){
                            if (err) throw err;
                            console.log('rows: ', rows);
                            result(rows);
        }); 
    },

    // delete a line item record by combination of LineID and QuoteID
    deleteLineItem: async (LineID, QuoteID, result) => {
        connection.query('DELETE FROM LineItems WHERE LineID = ? AND QuoteID = ?', [LineID, QuoteID], 
                        function(err, rows){
                            if (err) throw err;
                            console.log('Deleted');
                            result(rows);
        });
    },

    // delete all line items record associated with a QuoteID
    deleteLineItemsByQuoteID: async (QuoteID, result) => {
        connection.query('DELETE FROM LineItems WHERE QuoteID = ?', [QuoteID], 
                        function(err, rows){
                            if (err) throw err;
                            console.log('Deleted');
                            result(rows);
        });
    },

    // insert a line item record
    addLineItem: async (LineID, QuoteID, ItemDescription, Cost, result) => {
        connection.query(
            'INSERT INTO LineItems\
            (LineID, QuoteID, ItemDescription, Cost)\
            VALUES (?, ?, ?, ?)', 
            [LineID, QuoteID, ItemDescription, Cost], 
            function(err, rows){
                if (err) throw err;
                console.log('Added');
                result(rows);
        });
    },

    // update an existing line item record
    updateLineItem: async (oldLineID, newLineID, oldQuoteID, newQuoteID, ItemDescription, Cost, result) => {
        connection.query(
            'UPDATE LineItems\
                SET LineID = ?,\
                    QuoteID = ?,\
                    ItemDescription = ?,\
                    Cost = ?\
                WHERE LineID = ? AND QuoteID = ?', 
            [newLineID, newQuoteID, ItemDescription, Cost, oldLineID, oldQuoteID], 
            function(err, rows){
                if (err) throw err;
                console.log('Added');
                result(rows);
        });
    },
}
