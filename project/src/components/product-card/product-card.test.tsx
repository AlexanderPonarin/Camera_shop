import { fireEvent, render, screen } from '@testing-library/react';
import ProductCard from './product-card';
import {BrowserRouter as Router } from 'react-router-dom';
import { Product } from '../../types/products';

const product: Product = {
  id: 1,
  name: 'Product Name',
  price: 100,
  previewImg: 'product.jpg',
  previewImg2x: 'product@2x.jpg',
  previewImgWebp: 'product.webp',
  previewImgWebp2x: 'product@2x.webp',
  reviewCount: 5,
} as Product;

describe('ProductCard component', () => {
  const cbMock = jest.fn();

  test('renders correctly', () => {
    render(
      <Router >
        <ProductCard product={product} cb={cbMock}/>
      </Router>
    );
    expect(screen.getByAltText('Ретрокамера «Das Auge IV»')).toBeInTheDocument();
    expect(screen.getByText('Product Name')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
  });
  it('calls the cb function when the "Купить" button is clicked', () => {
    render(
      <Router >
        <ProductCard product={product} cb={cbMock} />
      </Router>
    );
    const buyButton = screen.getByRole('button', { name: /купить/i });
    fireEvent.click(buyButton);
    expect(cbMock).toHaveBeenCalledWith(product);
  });
});
