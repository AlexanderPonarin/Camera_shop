import { fireEvent, render, screen } from '@testing-library/react';
import ProductCard from './product-card';
import {BrowserRouter as Router } from 'react-router-dom';
import { Product, Products } from '../../types/products';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { UserProducts } from '../../types/user-products';


const mockStore = configureMockStore();

const mockUserProducts: UserProducts = [
  { product: {
    id: 10,
    name: 'Sample Product 1',
    description: 'Sample Description 1',
    price: 100,
  }},
] as unknown as UserProducts;

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

const reviews = {
  1:[
    {
      id: 1,
      author: 'User 1',
      reviewText: 'Good product.',
    },
    {
      id: 2,
      author: 'User 2',
      reviewText: 'Bad product.',
    },
  ]};

const mockProducts: Products = [{
  id: 1,
  name: 'Sample Product 1',
  description: 'Sample Description 1',
  price: 100,
},
{
  id: 2,
  name: 'Sample Product 2',
  description: 'Sample Description 2',
  price: 200,
}] as unknown as Products;


describe('ProductCard component', () => {
  const cbMock = jest.fn();


  test('renders correctly', () => {
    const store = mockStore({
      USER: {
        products: mockUserProducts
      },
      DATA: {
        reviews: reviews,
        products: mockProducts
      },
      MODALVIEW: {
        addItemModalViewStatus: false
      }
    });
    render(
      <Provider store={store}>
        <Router >
          <ProductCard product={product} cb={cbMock}/>
        </Router>
      </Provider>
    );
    expect(screen.getByAltText('Product Name')).toBeInTheDocument();
    expect(screen.getByText('Product Name')).toBeInTheDocument();
    expect(screen.getByText(/100/i)).toBeInTheDocument();
  });
  it('calls the cb function when the "Купить" button is clicked', () => {
    const store = mockStore({
      USER: {
        products: mockUserProducts
      },
      DATA: {
        reviews: reviews,
        products: mockProducts
      },
      MODALVIEW: {
        addItemModalViewStatus: false
      }
    });
    render(
      <Provider store={store}>
        <Router >
          <ProductCard product={product} cb={cbMock}/>
        </Router>
      </Provider>
    );
    const buyButton = screen.getByRole('button', { name: /купить/i });
    fireEvent.click(buyButton);
    expect(cbMock).toHaveBeenCalledWith(product);
  });
});
