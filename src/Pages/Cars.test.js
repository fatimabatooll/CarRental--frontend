import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, useNavigate } from 'react-router-dom';
import Cars from './Cars';

jest.mock('../hooks/useCars', () => () => [
  {
    id: 1,
    name: 'Car 1',
    shortDescription: 'Short description 1',
    rentalFee: 50,
    imageLink: 'car1.jpg',
  },
  {
    id: 2,
    name: 'Car 2',
    shortDescription: 'Short description 2',
    rentalFee: 60,
    imageLink: 'car2.jpg',
  },
]);

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ carId: '' }),
  useNavigate: jest.fn(),
}));

describe('Cars', () => {
  test('renders a list of cars correctly', () => {
    render(
      <MemoryRouter>
        <Cars />
      </MemoryRouter>
    );

    const car1Name = screen.getByText('Car 1');
    const car2Name = screen.getByText('Car 2');
    expect(car1Name).toBeInTheDocument();
    expect(car2Name).toBeInTheDocument();
  });

  test('navigates to car detail page when clicking on car name', () => {
    render(
      <MemoryRouter>
        <Cars />
      </MemoryRouter>
    );

    const car1Name = screen.getByText('Car 1');
    fireEvent.click(car1Name);
    expect(useNavigate).toHaveBeenCalledWith('/car/1');
  });

  test('navigates to rental form page when clicking on "Rent me now" button', () => {
    let navigatePath;
    const navigateMock = jest.fn((path) => {
      navigatePath = path;
    });
    useNavigate.mockImplementation(() => navigateMock);

    render(
      <MemoryRouter>
        <Cars />
      </MemoryRouter>
    );

    const rentButtons = screen.getAllByText('Rent me now');
    fireEvent.click(rentButtons[0]);
    expect(navigatePath).toBe('/car/1/rental-form');
  });
});
