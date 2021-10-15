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

// UI elements
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

function AdminPage(props){
	
    const [associatedata, setAssociatedata] = useState([]);
    const [quotedata, setQuotedata] = useState([]);
    let history = useHistory();
    const location = useLocation();

	//Associate column setup
    const associateColumns = [
        {title: 'Associate ID', field:'AssociateID'},
        {title: 'Username', field:'Username'},
        {title: 'Password', field:'Pass'},
        {title: 'Name', field:'Name'},
        {title: 'Commission', field:'Commission'},
        {title: 'Address', field:'Address'}
    ]
	
	//Quote column setup
	const quoteColumns = [
        {title: 'Quote ID', field:'QuoteID'},
        {title: 'Customer ID', field:'CustomerID'},
        {title: 'Associate ID', field:'AssociateID'},
        {title: 'Price', field:'Price'},
		{title: 'Percentage Discount?', field:'isPercentageDiscount'},
		{title: 'Purchased?', field:'isPurchased'},
		{title: 'Discount', field:'Discount'},
		{title: 'Time', field:'Time'},
		{title: 'Email', field:'Email'}
    ]

	// this call grabs data to populate the tables
    useEffect(() => {
            axios.get('http://localhost:3001/associates/').then((res) => {
                setAssociatedata(res.data);
                console.log(res.data);
            });
            axios.get('http://localhost:3001/quotes/').then((res) => {
                setQuotedata(res.data);
                console.log(res.data);
            });
    }, []);

    // used to update database when associate record is edited
    const handleAssociateUpdate = (newData, oldData, resolve) => {

        axios.put('http://localhost:3001/associates/' + oldData.AssociateID + '/ ' + newData.AssociateID + '/' + newData.Username
         + '/' + newData.Pass + '/' + newData.Name + '/' + newData.Commission + '/' + newData.Address).then((res) => {
            window.location.reload(false);
        })
    }

    // used to update database when associate record is deleted
    const handleAssociateDelete = (oldData, resolve) => {
        axios.delete('http://localhost:3001/associates/' + oldData.AssociateID).then((res) => {
            window.location.reload(false);
        })
    }
	
	//Create the Associates and Quotes table
    return(
        <>
            <div>
                <MaterialTable title="Associates"
                data={associatedata}
                columns={associateColumns}
                icons={tableIcons}
                options={{filtering:true}}
                editable={{         // allows editing and deleting of records
                    onRowUpdate: (newData, oldData) =>
                        new Promise((resolve) => {
                        handleAssociateUpdate(newData, oldData, resolve);
                    }),
                    onRowDelete: (oldData) =>
                     new Promise((resolve) => {
                         handleAssociateDelete(oldData, resolve)
                     })
                }}>
                </MaterialTable>
            </ div>
            <div>
                <MaterialTable title="Quotes"
                data={quotedata}
                columns={quoteColumns}
                icons={tableIcons}
                options={{filtering:true}}>
                </MaterialTable>
            </ div>
        </>
    );
}
export default AdminPage;