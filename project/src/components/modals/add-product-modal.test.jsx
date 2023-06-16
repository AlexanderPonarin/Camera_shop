import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AddProductModal from './add-product-modal';
import { Provider } from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import HistoryRouter from '../history-route/history-route';
import {createMemoryHistory} from 'history';



const mockStore = configureMockStore();

const store = mockStore({
  DATA: {
    isQuestionsDataLoading: false,
  },
  MODALVIEW: {
    addItemModalViewStatus: false
  }
});
describe('AddProductModal', () => {
  it('should render with correct product information', () => {
    const mockProduct = {
      name: 'Test Product',
      previewImg: 'test.png',
      previewImg2x: 'test@2x.png',
      previewImgWebp: 'test.webp',
      previewImgWebp2x: 'test@2x.webp',
      vendorCode: '123456',
      type: 'Test Type',
      level: 'Test Level',
      price: '99.99',
    };

    render(
      <Provider>
        <AddProductModal product={mockProduct} />
      </Provider>
    );

    expect(screen.getByText(/Добавить товар в корзину/i)).toBeInTheDocument();
    expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
    expect(screen.getByText(`Артикул: ${mockProduct.vendorCode}`)).toBeInTheDocument();
    expect(screen.getByText(mockProduct.type)).toBeInTheDocument();
    expect(screen.getByText(mockProduct.level)).toBeInTheDocument();
    expect(screen.getByText(`Цена: ${mockProduct.price}`)).toBeInTheDocument();
    expect(screen.getByAltText(mockProduct.name)).toHaveAttribute('src', `/${mockProduct.previewImg}`);
    expect(screen.getByLabelText(/закрыть попап/i)).toBeInTheDocument();
  });
});
