import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Footer from '../components/Footer';

describe('Footer Component', () => {
  test('renders the Green Grove section', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
  });
});
