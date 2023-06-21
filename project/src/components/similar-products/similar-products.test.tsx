import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import SimilarProducts from './similar-products';
import { fetchSimilarProductsAction } from '../../store/api-action';
import { Product } from '../../types/products';
import { setActiveProductVenderCode } from '../../store/product-data/product-data';


const mockStore = configureMockStore()


describe('SimilarProducts', () => {
  let store = mockStore({
    DATA: {
      similarProducts: [] as Products
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
        similarProducts: nextSlideBtn,
      },
    });
    store.dispatch = jest.fn();
  });

  it('should render component and check initial slider state', () => {
    render(
      <Provider store={store}>
        <SimilarProducts product={product} cb={cb} />
      </Provider>
    );

    screen.getByText('Похожие товары');
    expect(store.dispatch).toHaveBeenCalledWith(fetchSimilarProductsAction(product.id));
    expect(store.dispatch).toHaveBeenCalledWith(setActiveProductVenderCode(product.vendorCode));
  });

  it('should render component and check slider buttons', () => {
    render(
      <Provider store={store}>
        <SimilarProducts product={product} cb={cb} />
      </Provider>
    );
    const nextSlideBtn = screen.getByLabelText('Предыдущий слайд')
    expect(nextSlideBtn).not.toBeInDocument()
    expect(screen.getByLabelText('Предыдущий слайд').hasAttribute('disabled')).toBe(true);
    expect(screen.getByLabelText('Следующий слайд').hasAttribute('disabled')).toBe(false);

    jest.spyOn(window.HTMLMediaElement.prototype, 'clientWidth', 'get').mockReturnValue(100);

    store = mockStore({
      productData: {
        activeProductVenderCode: product.vendorCode,
        similarProducts,
      },
    });

    screen.getByLabelText('Следующий слайд').click();

    expect(screen.getByLabelText('Предыдущий слайд').hasAttribute('disabled')).toBe(false);
    expect(screen.getByLabelText('Следующий слайд').hasAttribute('disabled')).toBe(false);

    screen.getByLabelText('Следующий слайд').click();
    screen.getByLabelText('Следующий слайд').click();

    expect(screen.getByLabelText('Предыдущий слайд').hasAttribute('disabled')).toBe(false);
    expect(screen.getByLabelText('Следующий слайд').hasAttribute('disabled')).toBe(true);

    screen.getByLabelText('Предыдущий слайд').click();

    expect(screen.getByLabelText('Предыдущий слайд').hasAttribute('disabled')).toBe(false);
    expect(screen.getByLabelText('Следующий слайд').hasAttribute('disabled')).toBe(false);
  });
});
