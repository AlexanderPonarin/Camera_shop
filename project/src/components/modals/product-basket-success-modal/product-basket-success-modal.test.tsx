import AddProductSuccessModal from './product-basket-success-modal';
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

it('render ProductBasketSuccessModal component correctly', () => {
  render(
    <Provider store={store}>
      <Router>
        <AddProductSuccessModal />
      </Router>
    </Provider>
  );
  expect(screen.getByText(/Спасибо за покупку/i)).toBeInTheDocument();
  expect(screen.getByText(/Вернуться к покупкам/)).toBeInTheDocument();
});
