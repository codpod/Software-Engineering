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
    // get all notes
    getAllNotes: async result => {
        connection.query('SELECT * FROM Notes', function(err, rows){
            if (err) throw err;
            console.log('rows: ', rows);
            result(rows);
        });
    },

    // get one note by combination of NoteID and QuoteID
    getOneNote: async (NoteID, QuoteID, result) => {
        connection.query('SELECT * FROM Notes WHERE NoteID = ? AND QuoteID = ?', [NoteID, QuoteID], 
                        function(err, rows){
                            if (err) throw err;
                            console.log('rows: ', rows);
                            result(rows);
        });
    },

    // get all notes associated with one QuoteID
    getNoteByQuoteID: async (QuoteID, result) => {
        connection.query('SELECT * FROM Notes WHERE QuoteID = ?', [QuoteID],  
                        function(err, rows){
                            if (err) throw err;
                            console.log('rows: ', rows);
                            result(rows);
        });
    },

    // delete a note record by combination of LineID and QuoteID
    deleteNote: async (NoteID, QuoteID, result) => {
        connection.query('DELETE FROM Notes WHERE NoteID = ? AND QuoteID = ?', [NoteID, QuoteID], 
                        function(err, rows){
                            if (err) throw err;
                            console.log('Deleted');
                            result(rows);
        });
    },

    // delete all notes record associated with a QuoteID
    deleteNoteByQuoteID: async (QuoteID, result) => {
        connection.query('DELETE FROM Notes WHERE QuoteID = ?', [QuoteID], 
                        function(err, rows){
                            if (err) throw err;
                            console.log('Deleted');
                            result(rows);
        });
    },

    // insert a note record
    addNote: async (NoteID, QuoteID, Note, result) => {
        connection.query(
            'INSERT INTO Notes\
            (NoteID, QuoteID, Note)\
            VALUES (?, ?, ?)', 
            [NoteID, QuoteID, Note], 
            function(err, rows){
                if (err) throw err;
                console.log('Added');
                result(rows);
        });
    },

    // update an existing note record
    updateNote: async (oldNoteID, newNoteID, oldQuoteID, newQuoteID, Note, result) => {
        connection.query(
            'UPDATE Notes\
                SET NoteID = ?,\
                    QuoteID = ?,\
                    Note = ?\
                WHERE NoteID = ? AND QuoteID = ?', 
            [newNoteID, newQuoteID, Note, oldNoteID, oldQuoteID], 
            function(err, rows){
                if (err) throw err;
                console.log('Added');
                result(rows);
        });
    },
}



