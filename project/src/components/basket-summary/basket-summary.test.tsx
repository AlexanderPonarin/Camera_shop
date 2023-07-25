import React from 'react';
import { render, screen } from '@testing-library/react';
import BasketSummary from './basket-summary';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { UserProducts } from '../../types/user-products';

const mockStore = configureMockStore();

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
  }
});


describe('BasketSummary component', () => {
  test('renders the component and checks if all elements are present', () => {
    render(
      <Provider store={store}>
        <BasketSummary />
      </Provider>
    );
    const titleElement = screen.getByText('Если у вас есть промокод на скидку, примените его в этом поле');
    const promoInput = screen.getByPlaceholderText('Введите промокод');
    const applyButton = screen.getByText('Применить');
    const orderButton = screen.getByText('Оформить заказ');

    expect(titleElement).toBeInTheDocument();
    expect(promoInput).toBeInTheDocument();
    expect(applyButton).toBeInTheDocument();
    expect(orderButton).toBeInTheDocument();
  });
});
