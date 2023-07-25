import { render, cleanup, fireEvent, screen } from '@testing-library/react';
import ProductScreen from './product-screen';
import { Product } from '../../types/products';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import {BrowserRouter as Router } from 'react-router-dom';
import { UserProducts } from '../../types/user-products';


afterEach(cleanup);
const mockStore = configureMockStore([thunk]);

const mockUserProducts: UserProducts = [
  { product: {
    id: 1,
    name: 'Sample Product 1',
    description: 'Sample Description 1',
    price: 100,
  }},
] as unknown as UserProducts;

const mockProduct: Product = {
  name: 'Test Product',
  previewImg: '/test-image.jpg',
  price: 100,
} as Product;

describe('ProductScreen', () => {
  const store = mockStore({
    USER: {
      products: mockUserProducts
    },
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
    expect(screen.getAllByText(/100/i)[0]).toBeInTheDocument();
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
