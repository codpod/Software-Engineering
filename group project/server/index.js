const bodyParser = require('body-parser');
const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
var port = process.env.PORT || 3001

app.set('view engine', 'ejs');
var cors = require('cors');
app.use(cors())

// set up transporter for sending emails to customer
let transporter = nodemailer.createTransport({
    port: 465,               // true for 465, false for other ports
    host: "smtp.gmail.com",
       auth: {
            user: 'CSCI467Group1B@gmail.com',
            pass: 'csci467group1b',
         },
    secure: true,
});

// listen on port 3001 for connections to server
app.listen(3001, () => {
    console.log('running on port 3001')
})

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// GET CUSTOMER DATA CALLS - pulls from customer.js controller
const customerdata = require('./controllers/customer');

/*
function: get all customers
to use: GET call to '/getcustomers'
returns: an array of javascript objects, each object contains customer data
object values: id, name, city, street, contact
*/
app.get('/getcustomers', (req, res) => {
    customerdata.getAllCustomers((list) => {
        res.send(list)
    });
})

// ASSOCIATE CALLS - pulls from associate.js controller
const associatedata = require('./controllers/associate');

/*
function: get all associates
to use: GET call to '/associates'
returns: an array of javascript objects, each object contains associate data
object values: AssociateID, Username, Pass, Name, Commission, Address
*/
app.get('/associates', (req, res) => {
    associatedata.getAllAssociates(
        (list) => {res.send(list)});
})

/*
function: get one associate
to use: GET call to '/associates/:AssociateID'
arguments | AssociateID: ID of associate to get data about
returns: an array of one javascript object of associate's data
object values: AssociateID, Username, Pass, Name, Commission, Address
*/
app.get('/associates/:AssociateID', (req, res) => {
    associatedata.getOneAssociate(
        req.params.AssociateID, 
        (list) => {res.send(list)});
})

/*
function: delete one associate
to use: DELETE call to '/associates/:AssociateID'
arguments | AssociateID: ID of associate to delete
returns: javascript object about the SQL operation
object values: fieldCount, affectedRows, insertID, serverStatus, warningCount, message, protocol41, changedRows
*/
app.delete('/associates/:AssociateID', (req, res) => {
    associatedata.deleteAssociate(
        req.params.AssociateID, 
        (list) => {res.send(list)});
})

/*
function: insert a new associate
to use: POST call to '/associates/:AssociateID/:username/:password/:name/:commission/:address'
arguments | AssociateID: ID of Associate to add (pass in null for database to pick unique ID)
            username:    username of associate account (must be unique)
            password:    password of associate account
            name:        name of associate
            commission:  total commission total of associate
            address:     address of associate
returns: javascript object about the SQL operation
object values: fieldCount, affectedRows, insertID, serverStatus, warningCount, message, protocol41, changedRows
*/
app.post('/associates/:AssociateID/:username/:password/:name/:commission/:address', (req, res) => {
    associatedata.addAssociate(
        req.params.AssociateID, 
        req.params.username, 
        req.params.password, 
        req.params.name, 
        req.params.commission, 
        req.params.address, 
        (list) => {res.send(list)});
})

/*
function: update an associate record
to use: PUT call to '/associates/:oldAssociateID/:newAssociateID/:username/:password/:name/:commission/:address'
arguments | oldAssociateID: ID of Associate to edit
            newAssocaiteID: new (or same as previous) ID of associate 
            username:       username of associate account (must be unique)
            password:       password of associate account
            name:           name of associate
            commission:     total commission total of associate
            address:        address of associate
returns: javascript object about the SQL operation
object values: fieldCount, affectedRows, insertID, serverStatus, warningCount, message, protocol41, changedRows
*/
app.put('/associates/:oldAssociateID/:newAssociateID/:username/:password/:name/:commission/:address', (req, res) => {
    associatedata.updateAssociate(
        req.params.oldAssociateID, 
        req.params.newAssociateID, 
        req.params.username, 
        req.params.password, 
        req.params.name, 
        req.params.commission, 
        req.params.address, 
        (list) => {res.send(list)});
})

// QUOTE CALLS - pulls from quote.js controller
const quotedata = require('./controllers/quote');

/*
function: get all quotes
to use: GET call to '/quotes'
returns: an array of javascript objects, each object contains quote data
object values: QuoteID, CustomerID, AssociateID, Price, isSanctioned, isPercentageDiscount, isPurchased, Discount, Email, Time
*/
app.get('/quotes', (req, res) => {
    quotedata.getAllQuotes((list) => {
        res.send(list)
    });
})

/*
function: get one quote
to use: GET call to '/quotes/:QuoteID'
arguments | QuoteID: ID of quote to get data about
returns: an array of one javascript object of quote's data
object values: QuoteID, CustomerID, AssociateID, Price, isSanctioned, isPercentageDiscount, isPurchased, Discount, Email, Time
*/
app.get('/quotes/:QuoteID', (req, res) => {
    quotedata.getOneQuote(
        req.params.QuoteID, 
        (list) => {res.send(list)});
})

/*
function: get all sanctioned quotes
to use: GET call to '/sanctionedquotes'
returns: an array of javascript objects, each object contains quote data (limited to sanctioned quotes)
object values: QuoteID, CustomerID, AssociateID, Price, isSanctioned, isPercentageDiscount, isPurchased, Discount, Email, Time
*/
app.get('/sanctionedquotes', (req, res) => {
    quotedata.getSanctionedQuotes((list) => {
        res.send(list)
    });
})

/*
function: get all unsanctioned quotes
to use: GET call to '/unsanctionedquotes'
returns: an array of javascript objects, each object contains quote data (limited to unsanctioned quotes)
object values: QuoteID, CustomerID, AssociateID, Price, isSanctioned, isPercentageDiscount, isPurchased, Discount, Email, Time
*/
app.get('/unsanctionedquotes', (req, res) => {
    quotedata.getUnsanctionedQuotes((list) => {
        res.send(list)
    });
})

/*
function: delete one quote
to use: DELETE call to '/quotes/:QuoteID'
arguments | QuoteID: ID of quote to delete
returns: javascript object about the SQL operation
object values: fieldCount, affectedRows, insertID, serverStatus, warningCount, message, protocol41, changedRows
*/
app.delete('/quotes/:QuoteID', (req, res) => {
    quotedata.deleteQuote(
        req.params.QuoteID, 
        (list) => {res.send(list)});
})

/*
function: insert a new quote
to use: POST call to '/quotes/:QuoteID/:CustomerID/:AssociateID/:price/:issanctioned/:ispurchased/:ispercentagediscount/:discount/:email'
arguments | QuoteID:      ID of Quote to add (pass in null for database to pick unique ID)
            CustomerID:   ID of customer ordering the quote
            AssociateID:  ID of associate who made the quote
            price:        Total price of all line items associated with quote (from LineItems table)
            issanctioned: boolean of whether quote has been sanctioned
            ispurchased:  boolean of whether quote has been confirmed for purchase
            ispercentagediscount: boolean of whether the discount type is percentage based (true) or flat discount (false)
            discount:     numeric value of discount
            email:        email of customer
returns: javascript object about the SQL operation
object values: fieldCount, affectedRows, insertID, serverStatus, warningCount, message, protocol41, changedRows
*/
app.post('/quotes/:QuoteID/:CustomerID/:AssociateID/:price/:issanctioned/:ispurchased/:ispercentagediscount/:discount/:email', (req, res) => {
    quotedata.addQuote(
        req.params.QuoteID, 
        req.params.CustomerID, 
        req.params.AssociateID, 
        req.params.price, 
        req.params.issanctioned, 
        req.params.ispurchased, 
        req.params.ispercentagediscount,
        req.params.discount, 
        req.params.email,
        (list) => {res.send(list)});
})

/*
function: update an quote record
to use: PUT call to '/quotes/:oldQuoteID/:newQuoteID/:CustomerID/:AssociateID/:price/:issanctioned/:ispurchased/:ispercentagediscount/:discount/:email'
arguments | oldQuoteID:   ID of quote to edit
            newQuoteID:   new (or previous) ID of quote
            CustomerID:   ID of customer ordering the quote
            AssociateID:  ID of associate who made the quote
            price:        Total price of all line items associated with quote (from LineItems table)
            issanctioned: boolean of whether quote has been sanctioned
            ispurchased:  boolean of whether quote has been confirmed for purchase
            ispercentagediscount: boolean of whether the discount type is percentage based (true) or flat discount (false)
            discount:     numeric value of discount
            email:        email of customer
returns: javascript object about the SQL operation
object values: fieldCount, affectedRows, insertID, serverStatus, warningCount, message, protocol41, changedRows
*/
app.put('/quotes/:oldQuoteID/:newQuoteID/:CustomerID/:AssociateID/:price/:issanctioned/:ispurchased/:ispercentagediscount/:discount/:email', (req, res) => {
    quotedata.updateQuote(
        req.params.oldQuoteID, 
        req.params.newQuoteID, 
        req.params.CustomerID, 
        req.params.AssociateID, 
        req.params.price, 
        req.params.issanctioned, 
        req.params.ispurchased, 
        req.params.ispercentagediscount,
        req.params.discount, 
        req.params.email, 
        (list) => {res.send(list)});
})

// LINE ITEM CALLS - pulls from lineitem.js controller
const linedata = require('./controllers/lineitem');

/*
function: get all line items
to use: GET call to '/lineitems'
returns: an array of javascript objects, each object contains line item data
object values: LineID, QuoteID, ItemDescription, Cost
*/
app.get('/lineitems', (req, res) => {
    linedata.getAllLineItems((list) => {
        res.send(list)
    });
})

/*
function: get one line item
to use: GET call to '/lineitems/:LineID/:QuoteID'
arguments | LineID:  ID of lineitem to get data about
            QuoteID: ID of quote the line item is part of
returns: an array of one javascript object of line items's data
object values: LineID, QuoteID, ItemDescription, Cost
*/
app.get('/lineitems/:LineID/:QuoteID', (req, res) => {
    linedata.getOneLineItem(
        req.params.LineID, 
        req.params.QuoteID, 
        (list) => {res.send(list)});
})

/*
function: get all line items for one quote
to use: GET call to '/lineitems/:QuoteID'
arguments | QuoteID:  ID of quote to get all relevant line items
returns: an array of javascript objects, each object contains line item data
object values: LineID, QuoteID, ItemDescription, Cost
*/
app.get('/lineitems/:QuoteID', (req, res) => {
    linedata.getLineItemByQuoteID(
        req.params.QuoteID, 
        (list) => {res.send(list)});
})

/*
function: delete one line item
to use: DELETE call to '/lineitems/:QuoteID'
arguments | LineID:  ID of lineitem to delete
            QuoteID: ID of quote the line item is related to
returns: javascript object about the SQL operation
object values: fieldCount, affectedRows, insertID, serverStatus, warningCount, message, protocol41, changedRows
*/
app.delete('/lineitems/:LineID/:QuoteID', (req, res) => {
    linedata.deleteLineItem(
        req.params.LineID, 
        req.params.QuoteID, 
        (list) => {res.send(list)});
})

/*
function: delete all line items related to a quote
to use: DELETE call to '/lineitems/:QuoteID'
arguments | QuoteID: ID of quote to delete all line items of
returns: javascript object about the SQL operation
object values: fieldCount, affectedRows, insertID, serverStatus, warningCount, message, protocol41, changedRows
*/
app.delete('/lineitems/:QuoteID', (req, res) => {
    linedata.deleteLineItemsByQuoteID(
        req.params.QuoteID, 
        (list) => {res.send(list)});
})

/*
function: insert a new line item
to use: POST call to '/lineitems/:LineID/:QuoteID/:itemdescription/:cost'
arguments | LineID:          ID of line item to add (use null for database to choose unique ID)
            QuoteID:         ID of quote the line item is related to
            itemdescription: description of line item
            cost:            price of line item
returns: javascript object about the SQL operation
object values: fieldCount, affectedRows, insertID, serverStatus, warningCount, message, protocol41, changedRows
*/
app.post('/lineitems/:LineID/:QuoteID/:itemdescription/:cost', (req, res) => {
    linedata.addLineItem(
        req.params.LineID, 
        req.params.QuoteID, 
        req.params.itemdescription, 
        req.params.cost, 
        (list) => {res.send(list)});
})

/*
function: update an line item record
to use: PUT call to '/lineitems/:oldLineID/:newLineID/:oldQuoteID/:newQuoteID/:itemdescription/:cost'
arguments | oldLineID:       ID of line item to edit
            newLineID:       new (or previous) ID of line item
            oldQuoteID:      ID of quote line item to edit is related to
            newQuoteID:      new (or previous) ID of quote line items to edit is related to
            itemdescription: description of line item
            cost:            price of line item
returns: javascript object about the SQL operation
object values: fieldCount, affectedRows, insertID, serverStatus, warningCount, message, protocol41, changedRows
*/
app.put('/lineitems/:oldLineID/:newLineID/:oldQuoteID/:newQuoteID/:itemdescription/:cost', (req, res) => {
    linedata.updateLineItem(
        req.params.oldLineID, 
        req.params.newLineID, 
        req.params.oldQuoteID, 
        req.params.newQuoteID, 
        req.params.itemdescription, 
        req.params.cost, 
        (list) => {res.send(list)});
})

// NOTE CALLS - pulls form note.js controller
const notedata = require('./controllers/note');

/*
function: get all notes
to use: GET call to '/notes'
returns: an array of javascript objects, each object contains note data
object values: NoteID, QuoteID, Note
*/
app.get('/notes', (req, res) => {
    notedata.getAllNotes((list) => {
        res.send(list)
    });
})

/*
function: get one note
to use: GET call to '/notes/:NoteID/:QuoteID'
arguments | NoteID:  ID of note to get data about
            QuoteID: ID of quote the note is part of
returns: an array of one javascript object of note's data
object values: NoteID, QuoteID, Note
*/
app.get('/notes/:NoteID/:QuoteID', (req, res) => {
    notedata.getOneNote(
        req.params.NoteID, 
        req.params.QuoteID, 
        (list) => {res.send(list)});
})

/*
function: get all notes for one quote
to use: GET call to '/notes/:QuoteID'
arguments | QuoteID:  ID of quote to get all relevant notes
returns: an array of javascript objects, each object contains note data
object values: NoteID, QuoteID, Note
*/
app.get('/notes/:QuoteID', (req, res) => {
    notedata.getNoteByQuoteID(
        req.params.QuoteID, 
        (list) => {res.send(list)});
})

/*
function: delete one note
to use: DELETE call to '/notes/:QuoteID'
arguments | NoteID:  ID of note to delete
            QuoteID: ID of quote the note is related to
returns: javascript object about the SQL operation
object values: fieldCount, affectedRows, insertID, serverStatus, warningCount, message, protocol41, changedRows
*/
app.delete('/notes/:NoteID/:QuoteID', (req, res) => {
    notedata.deleteNote(
        req.params.NoteID, 
        req.params.QuoteID, 
        (list) => {res.send(list)});
})

/*
function: delete all notes related to a quote
to use: DELETE call to '/notes/:QuoteID'
arguments | QuoteID: ID of quote to delete all notes of
returns: javascript object about the SQL operation
object values: fieldCount, affectedRows, insertID, serverStatus, warningCount, message, protocol41, changedRows
*/
app.delete('/notes/:QuoteID', (req, res) => {
    notedata.deleteNoteByQuoteID( 
        req.params.QuoteID, 
        (list) => {res.send(list)});
})

/*
function: insert a new note
to use: POST call to '/notes/:NoteID/:QuoteID/:itemdescription/:cost'
arguments | NoteID:          ID of note to add (use null for database to choose unique ID)
            QuoteID:         ID of quote the note is related to
            Note:            note text
returns: javascript object about the SQL operation
object values: fieldCount, affectedRows, insertID, serverStatus, warningCount, message, protocol41, changedRows
*/
app.post('/notes/:NoteID/:QuoteID/:note', (req, res) => {
    notedata.addNote(
        req.params.NoteID, 
        req.params.QuoteID, 
        req.params.note,
        (list) => {res.send(list)});
})

/*
function: update an note record
to use: PUT call to '/notes/:oldNoteID/:newNoteID/:oldQuoteID/:newQuoteID/:note'
arguments | oldNoteID:    ID of note to update
            newNoteID:    new (or previous) ID of note
            oldQuoteID:   ID of quote the note is related to
            newQuoteID:   new (or previous) ID of quote note is related to
            Note:         note text
returns: javascript object about the SQL operation
object values: fieldCount, affectedRows, insertID, serverStatus, warningCount, message, protocol41, changedRows
*/
app.put('/notes/:oldNoteID/:newNoteID/:oldQuoteID/:newQuoteID/:note', (req, res) => {
    notedata.updateNote(
        req.params.oldNoteID, 
        req.params.newNoteID, 
        req.params.oldQuoteID, 
        req.params.newQuoteID, 
        req.params.note,
        (list) => {res.send(list)});
})


/*
function: send email to customer
to use: POST call to /emailcustomer with object containing arguments
arguments | to:      email address of customer
            subject: subject of email
            html:    string of HTML which is the body of the email
returns: confirmation of email sending or error
*/
app.post('/emailcustomer', (req, res) => {
    const {to, subject, html} = req.body;
    var mailData = {
        from: 'CSCI467Group1B@gmail.com',
        to: to,
        subject: subject,
        html: html
    };

    transporter.sendMail(mailData, (error, info) => {
        if (error) {
            return console.log(error);
        }
        res.status(200).send({ message: "Mail Send", message_id: info.messageId});
    });
});