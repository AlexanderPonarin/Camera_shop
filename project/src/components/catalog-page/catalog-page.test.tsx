import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CatalogPage from './catalog-page';
import { Products } from '../../types/products';
import { PromoProduct } from '../../types/promo-product';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';

const mockStore = configureMockStore();
const store = mockStore({
  MODALVIEW: {
    addItemModalViewStatus: false
  }
});

describe('CatalogPage', () => {
  const mockProducts: Products = [{id: 1, name: 'Product 1'}, {id: 2, name: 'Product 2'}] as Products;
  const mockPromoProduct: PromoProduct = {id: 3, name: 'Promo Product'} as PromoProduct;

  test('renders CatalogScreen with pageId when route param is provided', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/catalog/page/1']}>
          <CatalogPage products={mockProducts} promoProduct={mockPromoProduct} />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Каталог фото- и видеотехники/i)).toBeInTheDocument();
    expect(screen.getByTestId('icon-add-basket')).toBeInTheDocument();
    expect(screen.getByText('Promo Product')).toBeInTheDocument();
    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();
    expect(screen.getByText(/Категория/i)).toBeInTheDocument();
    expect(screen.getByText(/Тип камеры/i)).toBeInTheDocument();
    expect(screen.getByText(/Уровень/i)).toBeInTheDocument();
  });

  test('renders CatalogScreen without pageId when no route param is provided', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/catalog']}>
          <CatalogPage products={mockProducts} promoProduct={mockPromoProduct} />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.queryByText('Page ID: 1')).not.toBeInTheDocument();
    expect(screen.getByText(/Каталог фото- и видеотехники/i)).toBeInTheDocument();
    expect(screen.getByTestId('icon-add-basket')).toBeInTheDocument();
    expect(screen.getByText('Promo Product')).toBeInTheDocument();
    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();
    expect(screen.getByText(/Категория/i)).toBeInTheDocument();
    expect(screen.getByText(/Тип камеры/i)).toBeInTheDocument();
    expect(screen.getByText(/Уровень/i)).toBeInTheDocument();
  });
});
