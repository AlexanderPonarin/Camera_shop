import { render, screen} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Product from './product';
import { Products } from '../../types/products';


describe('Product', () => {
  const testProducts = [
    { id: 1, name: 'Test Product 1' },
    { id: 2, name: 'Test Product 2' },
  ] as Products;

  it('renders the product screen when a valid product ID is provided', () => {
    render(
      <MemoryRouter initialEntries={[ '/product/1' ]}>
        <Product products={testProducts} />
      </MemoryRouter>
    );

    expect(screen.getByText(/Test Product 1/i)).toBeInTheDocument();
  });

  it('renders the not found screen when an invalid product ID is provided', () => {
    render(
      <MemoryRouter initialEntries={[ '/product/3' ]}>
        <Product products={testProducts} />
      </MemoryRouter>
    );

    expect(screen.getByText(/Страница не найдена/i)).toBeInTheDocument();
    expect(screen.getByText('404')).toBeInTheDocument();

  });
});
