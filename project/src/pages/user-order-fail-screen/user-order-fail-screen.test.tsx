import UserOrderFailScreen from './user-order-fail-screen';
import { render, screen } from '@testing-library/react';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import {BrowserRouter as Router } from 'react-router-dom';


const mockStore = configureMockStore();

const store = mockStore({
  MODALVIEW: {
    itemBasketSuccessViewStatus: true
  }
});

it('render UserOrderFailScreen component correctly', () => {
  render(
    <Provider store={store}>
      <Router>
        <UserOrderFailScreen />
      </Router>
    </Provider>
  );
  expect(screen.getByText(/Ошибка/i)).toBeInTheDocument();
  expect(screen.getByText(/Заказ не был отправлен/i)).toBeInTheDocument();
  expect(screen.getByText(/Нажмите для перехода на главную страницу/i)).toBeInTheDocument();
  expect(screen.getByText(/Нажмите для перехода на страницу корзины/i)).toBeInTheDocument();

});
