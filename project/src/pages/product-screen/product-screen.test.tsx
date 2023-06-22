import { render, cleanup, fireEvent, screen } from '@testing-library/react';
import ProductScreen from './product-screen';
import { Product } from '../../types/products';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

afterEach(cleanup);
const mockStore = configureMockStore([thunk]);


const mockProduct: Product = {
  name: 'Test Product',
  previewImg: '/test-image.jpg',
  reviewCount: 10,
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
        <ProductScreen product={mockProduct} />
      </Provider>
    );
    expect(screen.getAllByText(mockProduct.name)[0]).toBeInTheDocument();
    expect(screen.getByAltText(mockProduct.name)).toHaveAttribute('src', `/${window.location.origin}${mockProduct.previewImg}`);
    expect(screen.getByText(`${mockProduct.reviewCount}`)).toBeInTheDocument();
    expect(screen.getByText(`${mockProduct.price}₽`)).toBeInTheDocument();
  });

  it('dispatches add product action when add to basket button is clicked', () => {
    render(
      <Provider store={store}>
        <ProductScreen product={mockProduct} />
      </Provider>
    );
    const addButton = screen.getByText('Добавить в корзину');
    fireEvent.click(addButton);

  });
});
