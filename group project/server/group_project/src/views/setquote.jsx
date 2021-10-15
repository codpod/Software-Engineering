import { React, useState } from 'react';
import {useHistory, useLocation } from 'react-router-dom';
import {Button, Checkbox, TextField} from '@material-ui/core';
import axios from 'axios';

//Function used to create a new quote
function SetQuote(){
    let history = useHistory();

    const location = useLocation();
    const [inputList, setInputList] = useState([{ lineItem: '', price: 0, description: ''}]);
    const [notesList, setNotesList] = useState([{notes: ''}]);
    const [associateid, setAssociateId] = useState(null);

    const [quote, setQuotes] = useState({ email: '', discount: 0})

    var [percentdiscount, setPercentDiscount] = useState(false);

    var [totalprice, setTotalPrice] = useState(0);
    var [reducedprice, setReducedPrice] = useState(0);

    //Sums the input list to give a total amount
    const sumInputList = () => {
        const tprice = inputList.reduce((a, { price }) => parseInt(a) + parseInt(price), 0);
        var rprice = 0;

        if(percentdiscount){
            rprice = tprice - tprice * (quote.discount/100);
        }
        else{
            rprice = tprice - quote.discount;
        }
        setTotalPrice(tprice);
        setReducedPrice(rprice);
    };

    //Updates the lineitems information
    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...inputList];
        list[index][name] = value;
        setInputList(list);
        sumInputList();
    };

    //Updates the Notes information
    const handleNotesInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...notesList];
        list[index][name] = value;
        setNotesList(list);
    };

    //removes an inline item form the list
    const handleRemoveClick = index => {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
        sumInputList();
    };

    //removes a note from the list
    const handleRemoveNotesClick = index => {
        const list = [...notesList];
        list.splice(index, 1);
        setNotesList(list);
        sumInputList();
    };

    //adds an inline item line to add more inline items
    const handleAddClick = () => {
        setInputList([...inputList, { lineItem: '', price: 0}]);
        sumInputList();
    };

    //adds a notes textview to add more notes
    const handleAddNotesClick = () => {
        setNotesList([...notesList, { notes: ''}]);
    };

    //updates the discount information
    const handleDiscountChange = (e) => {
        setQuotes({
            email: quote.email,
            discount: parseInt(e.target.value)
        });
    }

    //handles the information change
    const handleEmailChange = (e) => {
        
        setQuotes({
            email: e.target.value,
            discount: quote.discount
        });
    }

    //submits a quote
    const submitQuote = () => {
        //axios to submit a quote
        axios.post('http://localhost:3001/quotes/null/' + location.state.data.id +'/'+associateid+'/'+totalprice+'/0/0/'+percentdiscount+'/'+quote.discount+'/'+quote.email).then((res) => {
            inputList.map((x) => {
                    axios.post('http://localhost:3001/lineitems/null/'+res.data.insertId+'/'+x.description+'/'+x.price).then((result) => {
                    })
                });
            notesList.map((x) => {
                axios.post('http://localhost:3001/notes/null/'+res.data.insertId+'/'+x.notes).then((results) => {
                        history.push('/quoteconfirmation')
                    })
                });
            });
    }

    //returns html to render the quotes page
    return(
        <>
            <form>
                <TextField disabled id="customerid" label="Name" defaultValue={location.state.data.name} /><br />
                <TextField required id="associate" label="Associate Name" />
                <TextField required id="associateid" label="Associate ID" onChange={e => {setAssociateId(e.target.value);}} /><br />

                <Checkbox checked={percentdiscount} name="discounttype" label="Percent Discount?" onChange={e => {
                    setPercentDiscount(e.target.checked)
                    sumInputList()
                }}></Checkbox>Percent Discount?<br />

                <TextField required id="discountflat" label="Discount" type="number" onChange={e => handleDiscountChange(e)} /><br />
                <TextField required id="email" label="Email" onChange={e => handleEmailChange(e)} /><br />
                {notesList.map((x, i) => {
                    return (
                        <>
                            <TextField required id={x.notes} label="Notes" name='notes' onChange={e => handleNotesInputChange(e, i)} />
                            <div>
                                {notesList.length !== 1 && <button onClick={() => handleRemoveNotesClick(i)}>Remove</button>}
                                {notesList.length - 1 === i && <button onClick={handleAddNotesClick}>Add</button>}
                            </div>
                        </>
                    );
                }) 
                }
                <TextField disabled id="price" label="Price" type="number" defaultValue={totalprice} value={totalprice}/>
                <TextField disabled id="reducedprice" label="Reduced Price" type="number" defaultValue={reducedprice} value={reducedprice}/><br />
                {inputList.map((x, i) => {
                    return (
                        <>
                            <TextField required id={x.lineItem} label="Item" name="lineItem" onChange={e => handleInputChange(e, i)} />
                            <TextField required id={x.price + ''} label="Price" type="number" name="price" onChange={e => handleInputChange(e, i)} />
                            <TextField required id={x.description} label="Description" name="description" onChange={e => handleInputChange(e, i)} />
                            <div>
                                {inputList.length !== 1 && <button onClick={() => handleRemoveClick(i)}>Remove</button>}
                                {inputList.length - 1 === i && <button onClick={handleAddClick}>Add</button>}
                            </div>
                        </>
                    );
                })}
                <Button variant="outlined" onClick={submitQuote}>Submit</Button>
            </form>
        </>
    );
}

export default SetQuote;