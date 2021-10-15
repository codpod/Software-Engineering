import { Button, Typography } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router-dom';


//Renders the Quotes confirmation page.
function QuoteConfirmation(){
    let history = useHistory();

    const handleClick = () => {
        history.push('/associatespage');
    };

    return(
        <>
            <Typography>Quote Insertion Completed</Typography>
            <Button variant="outlined" onClick={handleClick}>Go To Associates Page</Button>
        </>
    );
}

export default QuoteConfirmation;