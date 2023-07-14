import Thankyou from "./Thankyou";
import { render ,fireEvent,  screen} from '@testing-library/react';
import { MemoryRouter, Router } from 'react-router-dom';


describe('Thankyou component', () => {
    it('displays "Thank you " message', () => {
        render(<MemoryRouter><Thankyou /></MemoryRouter>);
        expect(screen.getByText('Thank you')).toBeInTheDocument();
     });

     it('should have the start over button', ()=>{
        render(<MemoryRouter><Thankyou/></MemoryRouter>);
        expect(screen.getByText('Start over')).toBeInTheDocument();
      })
})







