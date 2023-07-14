import React from 'react';
import useCars from '../hooks/useCars';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Button, Typography, Box } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';

const Cars = () => {
  const cars = useCars([]);
  const { carId } = useParams();
  const navigate = useNavigate();
  const car = cars.find((car) => car.id === parseInt(carId));

  const carDetail = (carId) => {
    navigate(`/car/${carId}`);
  };

  const goToRentForm = (carId) => {
    navigate(`/car/${carId}/rental-form`);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '20px',
        flexWrap: 'wrap',
      }}
    >
      {cars.map((car) => (
        <Card key={car.id} style={{ width: '400px' }}>
          <CardMedia component="img" height="240" image={car.imageLink} alt={car.name} />
          <CardContent>
            <Typography variant="h5" onClick={() => carDetail(car.id)}>
              {car.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {car.shortDescription}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Price: {car.rentalFee}
            </Typography>
           <Button data-testid='btn' onClick={() => goToRentForm(car.id)} variant="contained" color="primary">
            Rent me now
          </Button>
          </CardContent>  
        </Card>
      ))}
    </Box>
  );
};
export default Cars;
