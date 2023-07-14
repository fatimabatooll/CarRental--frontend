import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, useParams, useNavigate } from 'react-router-dom';
import CarDetail from './CarDetail';

jest.mock('../hooks/useCars', () => () => [
  {
    id: 1,
    name: 'Car 1',
    shortDescription: 'Short description 1',
    longDescription: 'Long description 1',
    rentalFee: 50,
    imageLink: 'car1.jpg',
  },
  {
    id: 2,
    name: 'Car 2',
    shortDescription: 'Short description 2',
    longDescription: 'Long description 2',
    rentalFee: 60,
    imageLink: 'car2.jpg',
  },
]);

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
  useNavigate: jest.fn(),
}));

describe('CarDetail', () => {
  test('renders car details correctly', () => {
    useParams.mockReturnValue({ carId: '1' });

    render(
      <MemoryRouter>
        <CarDetail />
      </MemoryRouter>
    );

    const carName = screen.getByText('Car 1');
    const shortDescription = screen.getByText('Short description 1');
    const longDescription = screen.getByText('Long description 1');
    const rentalFee = screen.getByText('Price: 50');

    expect(carName).toBeInTheDocument();
    expect(shortDescription).toBeInTheDocument();
    expect(longDescription).toBeInTheDocument();
    expect(rentalFee).toBeInTheDocument();
  });

  test('navigates to rental form page when clicking "Rent me now" button', () => {
    useParams.mockReturnValue({ carId: '1' });
    const navigateMock = jest.fn();
    useNavigate.mockReturnValue(navigateMock);

    render(
      <MemoryRouter>
        <CarDetail />
      </MemoryRouter>
    );

    const rentButton = screen.getByText('Rent me now');
    fireEvent.click(rentButton);

    expect(useNavigate).toHaveBeenCalledTimes(1);
    expect(useNavigate).toHaveBeenCalledWith('/car/1/rental-form');
  });

  test('displays "Car not found" when car is not found', () => {
    useParams.mockReturnValue({ carId: '3' });

    render(
      <MemoryRouter>
        <CarDetail />
      </MemoryRouter>
    );
    const carNotFound = screen.getByText('Car not found');
    expect(carNotFound).toBeInTheDocument();
  });
});
