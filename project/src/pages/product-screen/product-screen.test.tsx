import { render, cleanup, fireEvent, screen } from '@testing-library/react';
import ProductScreen from './product-screen';
import { Product } from '../../types/products';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import {BrowserRouter as Router } from 'react-router-dom';


afterEach(cleanup);
const mockStore = configureMockStore([thunk]);


const mockProduct: Product = {
  name: 'Test Product',
  previewImg: '/test-image.jpg',
  price: 100,
} as Product;

describe('ProductScreen', () => {
  const store = mockStore({
    MODALVIEW: {
      addItemModalViewStatus: false
    },
    DATA: {
      similarProducts: [],
      reviews: []
    }
  });

  it('renders product details correctly', () => {
    render(
      <Provider store={store}>
        <Router>
          <ProductScreen product={mockProduct} />
        </Router>
      </Provider>
    );
    expect(screen.getAllByText(mockProduct.name)[0]).toBeInTheDocument();
    expect(screen.getAllByAltText(mockProduct.name)[0]).toHaveAttribute('src', `/${window.location.origin}${mockProduct.previewImg}`);
    expect(screen.getByText(`${mockProduct.price} ₽`)).toBeInTheDocument();
  });

  it('dispatches add product action when add to basket button is clicked', () => {
    render(
      <Provider store={store}>
        <Router>
          <ProductScreen product={mockProduct} />
        </Router>
      </Provider>
    );
    const addButton = screen.getAllByText('Добавить в корзину');
    fireEvent.click(addButton[0]);

  });
});
