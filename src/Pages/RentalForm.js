import React from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useCars from '../hooks/useCars';
import {TextField, Box, Typography, Button } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
 
const RentalForm = () => {
  const { carId } = useParams();
  const navigate = useNavigate(); 


  const savedFormData = JSON.parse(localStorage.getItem('formData')) || {};

  const [name, setName] = useState(savedFormData.name || '');
  const [email, setEmail] = useState(savedFormData.email || '');
  const [address, setAddress] = useState(savedFormData.address || '');
  const [phoneNumber, setPhoneNumber] = useState(savedFormData.phoneNumber || '');
  const [driverLicense, setDriverLicense] = useState(savedFormData.driverLicense || '');
  const [pickUpDateAndTime, setPickUpDateAndTime] = useState(savedFormData.pickUpDateAndTime || '');
  const [returnDateAndTime, setReturnDateAndTime] = useState(savedFormData.returnDateAndTime || '');
  const [checked, setChecked] = useState(savedFormData.checked || false);

  const cars = useCars([]);
  const [car, setCar] = useState(null);

  useEffect(() => {
    const selectedCar = cars.find((car) => car.id === parseInt(carId));
    if (selectedCar) {
      setCar(selectedCar);
    }
  }, [cars, carId]);

  useEffect(() => {
    const formData = {
      name,
      email,
      address,
      phoneNumber,
      driverLicense,
      pickUpDateAndTime,
      returnDateAndTime,
      checked
    };
    localStorage.setItem('formData', JSON.stringify(formData));
  }, [name, email, address, phoneNumber, driverLicense, pickUpDateAndTime, returnDateAndTime, checked]);

  const goToCars = () => {
    navigate('/');
 };
  function calculateTotalDays() {
      if (pickUpDateAndTime && returnDateAndTime) {
          const pickupDate = new Date(pickUpDateAndTime);
          const returnDate = new Date(returnDateAndTime);
          const timeDiff = returnDate.getTime() - pickupDate.getTime();
          const totalDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
          return totalDays;
      }
      return 0;
  }
  function totalPrice() {
      const days = calculateTotalDays()
      return days * car.rentalFee;
  }

  function totalPriceWithInsurance() {
      const days = calculateTotalDays();
      const total = totalPrice();
      return (days * 15000) + total;
  }
  if (!car) {
    return <p>Loading...</p>;
  }
  return (
    <div>
      
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
         <Button onClick={goToCars} variant="contained" color="primary">
          Change Car
        </Button>
        </CardContent>
      </Card>
    </Box>
    <Box sx={{ maxWidth: '400px', p: 4, border: '1px solid #ccc', borderRadius: '4px', justifyContent: 'center', alignItems: 'center', }}>
    <Typography variant="h4" align="center" mb={4}>
    price per day:{car.rentalFee}
    </Typography>

    <form>
    <TextField  type="text" label="Name" id="name" value={name} onChange={(e) => setName(e.target.value)} required fullWidth mb={2} sx={{ marginTop: '20px'}} />
    <TextField  type="text" label="address" id="address" value={address} onChange={(e) => setAddress(e.target.value)} required fullWidth mb={2} sx={{ marginTop: '20px'}} />
    <TextField  type="text" label="Email" id="email"  value={email} onChange={(e) => setEmail(e.target.value)} required fullWidth mb={2} sx={{ marginTop: '20px'}}/>
    <TextField  type="text" label="PhoneNumber" id="phoneNumber"  value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required fullWidth mb={2} sx={{ marginTop: '20px'}}/>
    <TextField  type="text" label="driverLicense" id="driverLicense"  value={driverLicense} onChange={(e) => setDriverLicense(e.target.value)} required fullWidth mb={2} sx={{ marginTop: '20px'}}/>
    <TextField  type="datetime-local" id="pickUpDateAndTime" name="pickUpDateAndTime"  value={pickUpDateAndTime} onChange={(e) => setPickUpDateAndTime(e.target.value)} required fullWidth mb={2} sx={{ marginTop: '20px'}} />
    <TextField  type="datetime-local" id="returnDateAndTime" name="returnDateAndTime"  value={returnDateAndTime} onChange={(e) => setReturnDateAndTime(e.target.value)} required fullWidth mb={2} sx={{ marginTop: '20px'}} />
    <TextField  value={calculateTotalDays()}  required fullWidth mb={2} sx={{ marginTop: '20px'}} />
    <TextField   value={totalPrice()}  required fullWidth mb={2} sx={{ marginTop: '20px'}} />

        <label htmlFor="totalPrice">total price:</label><br />
        <input type="text" value={totalPrice()} readOnly /><br />
        <label htmlFor="insurance">Want to pay for insurance per day Rs 15,000</label>
        <input type="checkbox" checked={checked} onChange={e =>setChecked(e.target.checked)}/><br />

        {checked && <>
            <label htmlFor="totalPrice">total price with insurance:</label><br />
            <input type="text" value={totalPriceWithInsurance()} readOnly />
        </>
        }
    </form>
    </Box>


</div>
  )
}

export default RentalForm