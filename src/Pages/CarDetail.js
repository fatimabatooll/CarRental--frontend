import React from 'react';
import useCars from '../hooks/useCars';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
 


const CarDetail = () => {
  const { carId } = useParams();
  const cars = useCars([]);
  const navigate = useNavigate(); 

  const car = cars.find((car) => car.id === parseInt(carId));

  if (!car) {
    return <Typography variant="h3">Car not found</Typography>;
  }


  const goToRentForm = () => {
     navigate(`/car/${carId}/rental-form`);
  };
  
  return (
    <Box>
      <Card style={{ width: '400px' }}>
        <CardMedia component="img" height="240" image={car.imageLink} alt={car.name} />
        <CardContent>
          <Typography variant="h5">{car.name}</Typography>
          <Typography variant="body2" color="text.secondary">
            {car.shortDescription}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {car.longDescription}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Price: {car.rentalFee}
          </Typography>
         <Button onClick={goToRentForm} variant="contained" color="primary">
          Rent me now
        </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CarDetail;
