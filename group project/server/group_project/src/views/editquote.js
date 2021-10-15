import {React, useState, useEffect, forwardRef} from 'react';
import {useLocation } from 'react-router-dom';
import {TextField} from '@material-ui/core';
import MaterialTable from 'material-table';
import axios from 'axios'
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import { useHistory } from 'react-router-dom';
import { alpha } from '@material-ui/core/styles';
import {Button} from '@material-ui/core';


const tableIcons = {
        Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
        Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
        Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
        DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
        Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
        Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
        FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
        LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
        NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
        ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
        SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
        ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
        ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
    };

function EditQuote(props){
	
    const [linedata, setLinedata] = useState([]);
    const [notedata, setNotedata] = useState([]);
    let history = useHistory();
    const location = useLocation();
    var finalPrice = 0;


	//Line item column setup
    const lineColumns = [
        {title: 'Quote ID', field:'QuoteID', hidden:true},
        {title: 'Line ID', field:'LineID'},
        {title: 'Description', field:'ItemDescription'},
        {title: 'Price', field:'Cost'}
    ]
	
	//Note column setup
	const noteColumns = [
        {title: 'Quote ID', field:'QuoteID', hidden:true},
        {title: 'Note ID', field:'NoteID'},
        {title: 'Description', field:'Note'}
    ]

	
    useEffect(() => {
            //axios call to get all the lineitems associated with a quote
            axios.get('http://localhost:3001/lineitems/' + location.state.data.QuoteID).then((res) => {
                setLinedata(res.data);
            });
            //axios to get all the notes associated with a quote
            axios.get('http://localhost:3001/notes/' + location.state.data.QuoteID).then((res) => {
                setNotedata(res.data);
            });
    }, []);

    //Function to handle the edits to an item in the table.
    const handleRowUpdate = (newData, oldData, resolve) => {

        //axios call to update the item in the table
        axios.put('http://localhost:3001/lineitems/' + oldData.LineID + '/' + newData.LineID + '/' + oldData.QuoteID + '/' + newData.QuoteID + '/' +
        newData.ItemDescription + '/' + newData.Cost).then((res) => {
            //axios to get all the lineitems
            axios.get('http://localhost:3001/lineitems/' + location.state.data.QuoteID).then((result) => {

                //axios to update the quote with the updated line items, and change the price
                axios.put('http://localhost:3001/quotes/' + location.state.data.QuoteID + '/' + location.state.data.QuoteID + '/' +
                    location.state.data.CustomerID + '/' + location.state.data.AssociateID + '/' + result.data.reduce((a, { Cost }) => parseInt(a) + parseInt(Cost), 0)
                    + '/0/' + location.state.data.isPurchased + '/' +
                    location.state.data.isPercentageDiscount + '/' +
                    location.state.data.Discount + '/' + location.state.data.Email).then((results) => {
                        console.log(results.data);
                })
            });
            console.log(location.state.data);
        })
        window.location.reload(false);
    }

    //Function to handle the edits to an item in the table.
    const handleNoteRowUpdate = (newData, oldData, resolve) => {
        //axios call to update the notes
        axios.put('http://localhost:3001/notes/' + oldData.NoteID + '/' + newData.NoteID + '/' + oldData.QuoteID + '/' + newData.QuoteID + '/' +
        newData.Note).then((res) => {
            window.location.reload(false);
        })
    }

    //Function to delete the items in a table
    const handleRowDelete = (oldData, resolve) => {
        //axios call to delete the line item
        axios.delete('http://localhost:3001/lineitems/' + oldData.LineID + '/' + oldData.QuoteID).then((res) => {

            //axios call to update the quote price
            axios.get('http://localhost:3001/lineitems/' + location.state.data.QuoteID).then((reply) => {
                setLinedata(reply.data);
                //update the quote price
                axios.put('http://localhost:3001/quotes/' + location.state.data.QuoteID + '/' + location.state.data.QuoteID + '/' +
                location.state.data.CustomerID + '/' + location.state.data.AssociateID + '/' + reply.data.reduce((a, { Cost }) => parseInt(a) + parseInt(Cost), 0) + '/0/' + location.state.data.isPurchased + '/' + location.state.data.isPercentageDiscount + '/' +
                location.state.data.Discount + '/' + location.state.data.Email).then((res) => {
                console.log(res.data);
            })
            });
        })
        window.location.reload(false);
    }

    //Function to delete the items in a table
    const handleNoteRowDelete = (oldData, resolve) => {
        //delete a note
        axios.delete('http://localhost:3001/notes/' + oldData.NoteID + '/' + oldData.QuoteID).then((res) => {
            window.location.reload(false);
        })
    }

    const handleBack = () => {
        history.push('/clerkpage1');
    };

    //function used to finalize a quote
    const handleFinalize = () => {
        
        //aplly the final discount and update the price
        if(location.state.data.isPercentageDiscount){
            finalPrice = location.state.data.Price - location.state.data.Price * (location.state.data.Discount * .01);
        }
        else{
            finalPrice = location.state.data.Price - location.state.data.Discount;
        }

        //update the price of the quote after the final discount
        axios.put('http://localhost:3001/quotes/' + location.state.data.QuoteID + '/' + location.state.data.QuoteID + '/' +
        location.state.data.CustomerID + '/' + location.state.data.AssociateID + '/' + finalPrice + '/1/' + location.state.data.isPurchased + '/' + location.state.data.isPercentageDiscount + '/' +
        location.state.data.Discount + '/' + location.state.data.Email).then((res) => {
            console.log(res.data);
            history.push('/clerkpage2');
            
            //used to email after update
            if(res.data){
                //get all the line items
                axios.get('http://localhost:3001/lineitems/' + location.state.data.QuoteID).then((res) => {
                    let percentage = "Yes";
                    if(location.state.data.isPercentageDiscount === 1) {percentage = "Yes";} else {percentage = "No";};

                    // list is HTML built to display line items
                    let list = "<ul>";
                    for (let i = 0; i < Object.keys(res.data).length; i++)
                    {
                        list += "<li>Item Description: ";
                        list += res.data[i].ItemDescription;
                        list += " | Price: ";
                        list += res.data[i].Cost;
                        list += "</li>";
                    }
                    list += "</ul>";

                    // html is HTML string to send in email
                    let html = "<h1>Quote Order #" + location.state.data.QuoteID + " Details</h1>\
                                <p>Quote ID: " + location.state.data.QuoteID +
                                   "<br/>CustomerID: " + location.state.data.CustomerID +
                                   "<br/>Percentage Based Discount? " + percentage +
                                   "<br/>Discount: " + location.state.data.Discount +
                                   list +
                                   "<br/>Initial Price: $" + location.state.data.Price +
                                   "<br/>Price after Discount: $" + finalPrice +
                                   "<br/>Customer Email: " + location.state.data.Email +
                                   "<br/>Original Quote Time: " + location.state.data.Time +
                                   "<br/><br/>Please reply to confirm your purchase.</p>";
                    //email the user
                    axios.post('http://localhost:3001/emailcustomer', {
                        to: location.state.data.Email,
                        subject: "Quote Order #" + location.state.data.QuoteID + " Details",
                        html: html
                    });
                })

            }

        })
    };
	
	//Create the Line Items and Notes tables
    return(
        <>
            <div>
                <Button variant="outlined" onClick={handleFinalize}>Finalize Quote</Button>
                <Button variant="outlined" onClick={handleBack}>Go Back</Button>
                <MaterialTable title="Line Items"
                data={linedata}
                columns={lineColumns}
                icons={tableIcons}
                options={{filtering:true}}
                editable={{
                    onRowUpdate: (newData, oldData) =>
                    new Promise((resolve) => {
                        handleRowUpdate(newData, oldData, resolve);
                    }),
                    onRowDelete: (oldData) =>
                        new Promise((resolve) => {
                            handleRowDelete(oldData, resolve)
                        })
                }}>
                </MaterialTable>
            </ div>
            <div>
                <MaterialTable title="Notes"
                data={notedata}
                columns={noteColumns}
                icons={tableIcons}
                options={{filtering:true}}
                editable={{
                    onRowUpdate: (newData, oldData) =>
                    new Promise((resolve) => {
                        handleNoteRowUpdate(newData, oldData, resolve);
                    }),
                    onRowDelete: (oldData) =>
                        new Promise((resolve) => {
                            handleNoteRowDelete(oldData, resolve)
                        })
                }}>
                </MaterialTable>
            </ div>
        </>
    );
}
export default EditQuote;