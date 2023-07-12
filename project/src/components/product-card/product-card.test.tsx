import { fireEvent, render, screen } from '@testing-library/react';
import ProductCard from './product-card';
import {BrowserRouter as Router } from 'react-router-dom';
import { Product } from '../../types/products';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';


const mockStore = configureMockStore();

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

describe('ProductCard component', () => {
  const cbMock = jest.fn();

  test('renders correctly', () => {
    const store = mockStore({
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
    expect(screen.getByAltText('Ретрокамера «Das Auge IV»')).toBeInTheDocument();
    expect(screen.getByText('Product Name')).toBeInTheDocument();
    expect(screen.getByText('100 ₽')).toBeInTheDocument();
  });
  it('calls the cb function when the "Купить" button is clicked', () => {
    const store = mockStore({
      DATA: {
        reviews: reviews
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
