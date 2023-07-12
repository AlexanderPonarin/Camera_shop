import React from 'react';
import { act, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import SimilarProducts from './similar-products';
import { Product } from '../../types/products';
import { setActiveProductVenderCode } from '../../store/product-data/product-data';
import {BrowserRouter as Router } from 'react-router-dom';


const mockStore = configureMockStore();
const reviews = {
  2:[
    {
      id: 1,
      author: 'User 1',
      reviewText: 'Good product.',
    },
    {
      id: 2,
      author: 'User 2',
      reviewText: 'Bad product.',
    },
  ],
  3:[
    {
      id: 1,
      author: 'User 1',
      reviewText: 'Good product.',
    },
    {
      id: 2,
      author: 'User 2',
      reviewText: 'Bad product.',
    },
  ],
};

describe('SimilarProducts', () => {
  let store = mockStore({
    DATA: {
      similarProducts: [],
      reviews: reviews,
    }
  });
  const product: Product = {
    id: 1,
    vendorCode: 'vc1',
  } as Product;

  const similarProducts = [
    {
      id: 2,
      vendorCode: 'vc2',
    },
    {
      id: 3,
      vendorCode: 'vc3',
    },
  ];
  const cb = jest.fn();

  beforeEach(() => {
    store = mockStore({
      DATA: {
        activeProductVenderCode: '',
        similarProducts: similarProducts,
        reviews: reviews,
      },
    });
    store.dispatch = jest.fn();
  });

  it('should render component and check initial slider state', () => {
    render(
      <Provider store={store}>
        <Router>
          <SimilarProducts product={product} cb={cb} />
        </Router>
      </Provider>
    );

    screen.getByText('Похожие товары');
    expect(store.dispatch).toHaveBeenCalledWith(setActiveProductVenderCode(product.vendorCode));
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
        revies: reviews
      },
    });

    act(() => {
      screen.getByLabelText('Следующий слайд').click();
    });

    expect(screen.getByLabelText('Предыдущий слайд').hasAttribute('disabled')).toBe(false);
    expect(screen.getByLabelText('Следующий слайд').hasAttribute('disabled')).toBe(false);

    act(() => {
      screen.getByLabelText('Следующий слайд').click();
      screen.getByLabelText('Следующий слайд').click();
    });

    expect(screen.getByLabelText('Предыдущий слайд').hasAttribute('disabled')).toBe(false);
    expect(screen.getByLabelText('Следующий слайд').hasAttribute('disabled')).toBe(false);

    act(() => {
      screen.getByLabelText('Предыдущий слайд').click();
    });

    expect(screen.getByLabelText('Предыдущий слайд').hasAttribute('disabled')).toBe(false);
    expect(screen.getByLabelText('Следующий слайд').hasAttribute('disabled')).toBe(false);
  });
});
