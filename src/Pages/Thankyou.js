import React from 'react'
import { Box, Button } from '@mui/material';
import {  useNavigate } from 'react-router-dom';


const Thankyou = () => {
    const navigate = useNavigate(); 

    const handlethanks = () => {
        navigate('/');
     };
  return (
    <Box>
        <h1> Thank you </h1>
         <Button onClick={handlethanks} variant="contained" color="primary" 
         sx={{justifyContent:'center'
        }}>
         Start over
        </Button>
    </Box>
  )
}

export default Thankyou