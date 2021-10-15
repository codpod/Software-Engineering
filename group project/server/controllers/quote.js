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
    // get all quotes
    getAllQuotes: async result => {
        connection.query('SELECT * FROM Quotes', function(err, rows){
            if (err) throw err;
            console.log('rows: ', rows);
            result(rows);
        });
    },

    // get one quote by QuoteID
    getOneQuote: async (id, result) => {
        connection.query('SELECT * FROM Quotes WHERE QuoteID = ?', [id], function(err, rows){
            if (err) throw err;
            console.log('rows: ', rows);
            result(rows);
        });
    },

    // get all sanctioned quotes
    getSanctionedQuotes: async (result) => {
        connection.query('SELECT * FROM Quotes WHERE isSanctioned = 1', function(err, rows){
            if (err) throw err;
            console.log('rows: ', rows);
            result(rows);
        });
    },

    // get all unsanctioned quotes
    getUnsanctionedQuotes: async (result) => {
        connection.query('SELECT * FROM Quotes WHERE isSanctioned = 0', function(err, rows){
            if (err) throw err;
            console.log('rows: ', rows);
            result(rows);
        });
    },

    // selete quote record by QuoteID
    deleteQuote: async (id, result) => {
        connection.query('DELETE FROM Quotes WHERE QuoteID = ?', [id], function(err, rows){
            if (err) throw err;
            console.log('Deleted');
            result(rows);
        });
    },

    // insert a quote record 
    addQuote: async (QuoteID, CustomerID, AssociateID, Price, isSanctioned, isPurchased, isPercentageDiscount, Discount, Email, result) => {
        connection.query(
            'INSERT INTO Quotes\
            (QuoteID, CustomerID, AssociateID, Price, isSanctioned, isPurchased, isPercentageDiscount, Discount, Email)\
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', 
            [QuoteID, CustomerID, AssociateID, Price, isSanctioned, isPurchased, isPercentageDiscount, Discount, Email], 
            function(err, rows){
                if (err) throw err;
                console.log('Added');
                result(rows);
        });
    },

    // update an existing quote record
    updateQuote: async (oldQuoteID, newQuoteID, CustomerID, AssociateID, Price, isSanctioned, isPurchased, isPercentageDiscount, Discount, Email, result) => {
        connection.query(
            'UPDATE Quotes\
                SET QuoteID = ?,\
                    CustomerID =?,\
                    AssociateID = ?,\
                    Price = ?,\
                    isSanctioned = ?,\
                    isPurchased = ?,\
                    isPercentageDiscount = ?,\
                    Discount = ?,\
                    Email = ?\
                WHERE QuoteID = ?', 
            [newQuoteID, CustomerID, AssociateID, Price, isSanctioned, isPurchased, isPercentageDiscount, Discount, Email, oldQuoteID], 
            function(err, rows){
                if (err) throw err;
                console.log('Added');
                result(rows);
        });
    }
}