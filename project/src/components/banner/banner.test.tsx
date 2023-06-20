import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Banner from './banner';
import { promoProductMock, productDescriptionMock } from '../../mocks/mocks';


describe('Banner component', () => {
  test('renders product name in banner component', () => {
    render(
      <Router>
        <Banner promoProduct={promoProductMock} productDescription={productDescriptionMock} />
      </Router>
    );
    const productNameElement = screen.getByText('Product Mock');
    expect(productNameElement).toBeInTheDocument();
  });

  test('renders a Link component with a button to product details page', () => {
    render(
      <Router>
        <Banner promoProduct={promoProductMock} productDescription={productDescriptionMock} />
      </Router> );
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', `/product/${promoProductMock.id}`);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  test('should render product description if it\'s provided in props', () => {
    render(
      <Router>
        <Banner promoProduct={promoProductMock} productDescription={productDescriptionMock} />
      </Router> );
    const description = screen.getByText('Product description Mock');
    expect(description).toBeInTheDocument();
  });
});
