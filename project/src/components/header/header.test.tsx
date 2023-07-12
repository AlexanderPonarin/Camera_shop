import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from './header';
import {BrowserRouter as Router } from 'react-router-dom';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import { Products } from '../../types/products';


const mockStore = configureMockStore();

const mockProducts: Products = [{
  id: 1,
  name: 'Test product name 1'
},
{
  id: 2,
  name: 'Test product name 2'
},
] as Products;


const store = mockStore({
  DATA: {
    products: mockProducts,
  },});

describe('Header', () => {
  it('should render the header component correctly', () => {
    render(
      <Provider store={store}>
        <Router>
          <Header />
        </Router>
      </Provider>
    );
    const headerEl = screen.getByRole('banner');
    const logoEl = screen.getByLabelText('Переход на главную');
    const navEl = screen.getByText('Каталог');
    const searchEl = screen.getByPlaceholderText('Поиск по сайту');

    expect(headerEl).toBeInTheDocument();
    expect(logoEl).toBeInTheDocument();
    expect(navEl).toBeInTheDocument();
    expect(searchEl).toBeInTheDocument();
  });
});
