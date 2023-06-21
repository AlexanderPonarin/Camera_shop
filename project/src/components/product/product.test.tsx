import { render, screen} from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Product from './product';
import { Products } from '../../types/products';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';


const mockStore = configureMockStore();
const store = mockStore({
  MODALVIEW: {
    addItemModalViewStatus: false
  },
  DATA: {
    similarProducts: [],
    reviews:[]
  }
});

describe('Product', () => {
  const testProducts = [
    { id: 1, name: 'Test Product 1' },
    { id: 2, name: 'Test Product 2' },
  ] as Products;

  it('renders the product screen when a valid product ID is provided', () => {
    render(
      <MemoryRouter initialEntries={[ '/product/1' ]}>
        <Provider store={store} >
          <Routes>
            <Route
              path={'product/:id'}
              element={<Product products={testProducts} />}
            />

          </Routes>
        </Provider>
      </MemoryRouter>
    );

    expect(screen.getAllByText('Test Product 1')[0]).toBeInTheDocument();
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
