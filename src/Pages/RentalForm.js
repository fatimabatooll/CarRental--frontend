import React from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useCars from '../hooks/useCars';
import {TextField, Box, Typography, Button } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Checkbox } from '@mui/material';
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
  const [pickupDateTime, setpickupDateTime] = useState(savedFormData.pickupDateTime || '');
  const [dropDateTime, setdropDateTime] = useState(savedFormData.dropDateTime || '');
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
      pickupDateTime,
      dropDateTime,
      checked
    };
    localStorage.setItem('formData', JSON.stringify(formData));
  }, [name, email, address, phoneNumber, driverLicense, pickupDateTime, dropDateTime, checked]);

  const goToCars = () => {
    navigate('/');
 };
 
  function calculateTotalDays() {
      if (pickupDateTime && dropDateTime) {
          const pickupDate = new Date(pickupDateTime);
          const returnDate = new Date(dropDateTime);
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
  function damageWavier() {
    const days = calculateTotalDays();
    return days * 15000;
}


 function handleCheckout() {
    if (checked === false) {
        const newFormInfo = {
            carId: car.id,
            name: name,
            phoneNumber: phoneNumber,
            email:email,
            address: address,
            driverLicense: driverLicense,
            pickupDateTime: pickupDateTime,
            dropDateTime: dropDateTime,
            totalPrice: totalPrice()
        }
        fetch('http://localhost:8081/rentals/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newFormInfo)
        })
            .then(response => {
                console.log("done")
            })
            .catch(error => {
                console.error('Error saving data:', error);
            });

    }
    else {
        const newFormInfo = {
            carId: car.id,
            name: name,
            phoneNumber: phoneNumber,
            email:email,
            address: address,
            driverLicense: driverLicense,
            pickupDateTime: pickupDateTime,
            dropDateTime: dropDateTime,
            totalPrice: totalPriceWithInsurance()
        }
        fetch('http://localhost:8081/rentals/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newFormInfo)
        })
            .then(response => {
                console.log("done")

            })
            .catch(error => {
                console.error('Error', error);
            });
        const DamageWavier = {
            carId: car.id,
            name: name,
            phoneNumber: phoneNumber,
            address: address,
            email:email,
            driverLicense: driverLicense,
            pickupDateTime: pickupDateTime,
            dropDateTime: dropDateTime,
            totalPrice: damageWavier()
        }
        fetch('http://localhost:8081/rentals/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(DamageWavier)
        })
            .then(response => {
                console.log(response.json())

            })
            .catch(error => {
                console.error('Error ', error);
            });
    }

    navigate("/thanks")
    localStorage.clear()
}

  if (!car) {
    return <p>Loading...</p>;
  }
  return (
    <Box display="flex" justifyContent="center">
    <Card sx={{ width: '400px', mt: 9,  }}>
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
        <Button onClick={goToCars} variant="contained" color="primary" mt={2}>
          Change Car
        </Button>
      </CardContent>
    </Card>
    <Box sx={{ width: '400px', ml: 2, mt: 9 }}>
      <Typography variant="h4" align="center" mb={4}>
        Price per day: {car.rentalFee}
      </Typography>
      <form>
        <TextField
          type="text"
          label="Name"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          fullWidth
          mb={2}
        />
        <TextField
          type="text"
          label="Address"
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
          fullWidth
          mb={2}
        />
        <TextField
          type="text"
          label="Email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          fullWidth
          mb={2}
        />
        <TextField
          type="text"
          label="Phone Number"
          id="phoneNumber"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
          fullWidth
          mb={2}
        />
        <TextField
          type="text"
          label="Driver License"
          id="driverLicense"
          value={driverLicense}
          onChange={(e) => setDriverLicense(e.target.value)}
          required
          fullWidth
          mb={2}
        />
        <TextField
          type="datetime-local"
          id="pickupDateTime"
          name="pickupDateTime"
          value={pickupDateTime}
          onChange={(e) => setpickupDateTime(e.target.value)}
          required
          fullWidth
          mb={2}
        />
        <TextField
          type="datetime-local"
          id="dropDateTime"
          name="dropDateTime"
          value={dropDateTime}
          onChange={(e) => setdropDateTime(e.target.value)}
          required
          fullWidth
          mb={2}
        />
        <TextField value={calculateTotalDays()} required fullWidth mb={2} />
        <TextField
          id="totalPrice"
          label="Total Price:"
          value={totalPrice()}
          InputProps={{
            readOnly: true
          }}
          fullWidth
          mb={2}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
            />
          }
          label="Want to pay for insurance per day Rs 15,000"
          mb={2}
        />
        {checked && (
          <TextField
            id="totalPriceWithInsurance"
            label="Total Price with Insurance:"
            value={totalPriceWithInsurance()}
            InputProps={{
              readOnly: true
            }}
            fullWidth
            mb={2}
          />
        )}
         <Button onClick={handleCheckout} variant="contained" color="primary" fullWidth>
          Check out
        </Button>
      </form>
    </Box>
  </Box>
  )
}

export default RentalForm