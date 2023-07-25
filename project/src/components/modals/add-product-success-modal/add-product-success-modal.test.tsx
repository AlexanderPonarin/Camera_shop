import AddProductSuccessModal from './add-product-success-modal';
import { render, screen } from '@testing-library/react';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import {BrowserRouter as Router } from 'react-router-dom';


const mockStore = configureMockStore();

const store = mockStore({
  MODALVIEW: {
    addItemSuccessModalViewStatus: true
  }
});

it('render AddProductSuccessModal component correctly', () => {
  render(
    <Provider store={store}>
      <Router>
        <AddProductSuccessModal />
      </Router>
    </Provider>
  );
  expect(screen.getByText(/Товар успешно добавлен в корзину/)).toBeInTheDocument();
  expect(screen.getByText(/Перейти в корзину/)).toBeInTheDocument();
});
