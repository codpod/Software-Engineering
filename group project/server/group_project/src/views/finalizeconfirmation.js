import { Button, Typography } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router-dom';


//Confirmation page for finalized quotes
function FinalizeConfirmation(){
    let history = useHistory();

    const handleClick = () => {
        history.push('/clerkpage2');
    };

    return(
        <>
            <Typography>Quote Finalization Completed</Typography>
            <Button variant="outlined" onClick={handleClick}>Go To Clerk Page</Button>
        </>
    );
}

export default FinalizeConfirmation;