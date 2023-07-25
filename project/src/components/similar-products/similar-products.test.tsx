import React from 'react';
import { act, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import SimilarProducts from './similar-products';
import { Product } from '../../types/products';
import {BrowserRouter as Router } from 'react-router-dom';
import { UserProducts } from '../../types/user-products';


const mockStore = configureMockStore();


describe('SimilarProducts', () => {

  const mockUserProducts: UserProducts = [
    { product: {
      id: 1,
      name: 'Sample Product 1',
      description: 'Sample Description 1',
      price: 100,
    }},
  ] as unknown as UserProducts;

  const similarProducts = [
    {
      id: 2,
      vendorCode: 'vc2',
      name: 'test similar product'
    },
    {
      id: 3,
      vendorCode: 'vc3',
      name: 'test similar product 2'
    },
  ];

  let store = mockStore({
    USER: {
      products: mockUserProducts
    },
    DATA: {
      activeProductVenderCode: '',
      similarProducts: similarProducts,
    },
  });

  const product: Product = {
    id: 1,
    vendorCode: 'vc1',
  } as Product;


  const cb = jest.fn();

  beforeEach(() => {
    store = mockStore({
      USER: {
        products: mockUserProducts
      },
      DATA: {
        activeProductVenderCode: '',
        similarProducts: similarProducts,
      },
    });
    store.dispatch = jest.fn();
  });

  it('should render component', () => {
    render(
      <Provider store={store}>
        <Router>
          <SimilarProducts product={product} cb={cb} />
        </Router>
      </Provider>
    );
    screen.getByText('Похожие товары');

  });

  it('should render component and check slider buttons', () => {
    render(
      <Provider store={store}>
        <Router>
          <SimilarProducts product={product} cb={cb} />
        </Router>
      </Provider>
    );

    expect(screen.getByLabelText('Предыдущий слайд').hasAttribute('disabled')).toBe(false);
    expect(screen.getByLabelText('Следующий слайд').hasAttribute('disabled')).toBe(false);

    jest.spyOn(window.HTMLMediaElement.prototype, 'clientWidth', 'get').mockReturnValue(100);

    store = mockStore({
      productData: {
        activeProductVenderCode: product.vendorCode,
        similarProducts,
      },
    });

    screen.getByLabelText('Следующий слайд').click();
    act(() => {
      screen.getByLabelText('Следующий слайд').click();
    });

    expect(screen.getByLabelText('Предыдущий слайд').hasAttribute('disabled')).toBe(false);
    expect(screen.getByLabelText('Следующий слайд').hasAttribute('disabled')).toBe(false);

    screen.getByLabelText('Следующий слайд').click();
    screen.getByLabelText('Следующий слайд').click();
    act(() => {
      screen.getByLabelText('Следующий слайд').click();
      screen.getByLabelText('Следующий слайд').click();
    });

    expect(screen.getByLabelText('Предыдущий слайд').hasAttribute('disabled')).toBe(false);
    expect(screen.getByLabelText('Следующий слайд').hasAttribute('disabled')).toBe(false);

    screen.getByLabelText('Предыдущий слайд').click();
    act(() => {
      screen.getByLabelText('Предыдущий слайд').click();
    });

    expect(screen.getByLabelText('Предыдущий слайд').hasAttribute('disabled')).toBe(false);
    expect(screen.getByLabelText('Следующий слайд').hasAttribute('disabled')).toBe(false);
  });
});
