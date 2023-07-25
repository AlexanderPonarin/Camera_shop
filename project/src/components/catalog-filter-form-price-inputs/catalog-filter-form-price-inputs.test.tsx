import { render, fireEvent, screen } from '@testing-library/react';
import CataloFilterFormPriceInputs from './catalog-filter-form-price-inputs';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { UserProducts } from '../../types/user-products';
import { Products } from '../../types/products';


const mockStore = configureMockStore();

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

const mockUserProducts: UserProducts = [
  { product: {
    id: 1,
    name: 'Sample Product 1',
    description: 'Sample Description 1',
    price: 100,
  }},
] as unknown as UserProducts;

const store = mockStore({
  USER: {
    products: mockUserProducts
  },
  DATA: {
    products: mockProducts
  }
}
);

test('should update min price correctly', () => {
  render(
    <Provider store={store}>
      <Router>
        <CataloFilterFormPriceInputs lte={0} gte={100} />
      </Router>
    </Provider>
  );

  const minPriceInput: HTMLInputElement = screen.getByTestId(/minprice/i);

  fireEvent.change(minPriceInput, { target: { value: '50' } });

  expect(minPriceInput.value).toBe('50');
});
