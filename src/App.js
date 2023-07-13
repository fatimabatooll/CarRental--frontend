import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Cars from './Pages/Cars';
import CarDetail from './Pages/CarDetail';
import RentalForm from './Pages/RentalForm';
// import Navbar from './components/Navbar';

function App() {
  return (
 <>
   <BrowserRouter>
   {/* <Navbar/> */}
    <Routes>
    <Route path="/" element={<Cars/>} />
        <Route path="/car/:carId" element={<CarDetail/>} />
        <Route path="car/:carId/rental-form" element={<RentalForm/>} />
       
    </Routes>
    </BrowserRouter>
 </>
  );
}

export default App;
