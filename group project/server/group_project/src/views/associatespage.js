import {React, useState, useEffect, forwardRef} from 'react';
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

//All the table icons used in the table
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


//Function to render the AssociatesPage    
function AssociatesPage(props){
    const [customerdata, setCustomerdata] = useState([]);
    let history = useHistory();
    
    //Used to tell MaterialTable the structure of the data
    const columns = [
        {title: 'ID', field:'id', hidden:true},
        {title: 'Name', field:'name'},
        {title: 'City', field:'city'},
        {title: 'Street', field:'street'},
        {title: 'Contact', field:'contact'}
    ]


    useEffect(() => {
            //Axios call to get customer information
            axios.get('http://localhost:3001/getcustomers').then((res) => {
                setCustomerdata(res.data);
                console.log(res.data);
            });
    }, []);

    //function to redirect to a page where you can enter a quote for a customer
    function handleRowClick(event, rowData){
        history.push({
            pathname: '/setquote',
            state: {data: rowData}
        })
    };

    return(
        <div>
            {/* MaterialTable to house all the customer information */}
            <MaterialTable title="Customer Table"
            data={customerdata}
            columns={columns}
            icons={tableIcons}
            options={{filtering:true}}
            onRowClick={handleRowClick}>
            </MaterialTable>
        </ div>
    );
}
export default AssociatesPage;