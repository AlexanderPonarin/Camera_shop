import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import HistoryRouter from '../history-route/history-route';
import App from './app';
import { Products } from '../../types/products';
import { PromoProduct } from '../../types/promo-product';
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

const mockProducts: Products = [{
  id: 1,
  name: 'Test product name 1'
},
{
  id: 2,
  name: 'Test product name 2'
},
] as Products;

const mockPromoProduct: PromoProduct = {
  id: 1,
  name: 'Test promo product'
} as PromoProduct;

const store = mockStore({
  DATA: {
    isProductsDataLoading: false,
    products: mockProducts,
    promoProduct: mockPromoProduct
  },
  MODALVIEW: {
    addItemModalViewStatus: false,
  },
  USER: {
    isUserProcessLoading: false,
    products: mockUserProducts
  }
});

const history = createMemoryHistory();


const fakeApp = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <App />
    </HistoryRouter>
  </Provider>
);

describe('Application Routing', () => {
  test('should render "CatalogScreen" when user navigate to "/"', () => {
    history.push('/');
    render(fakeApp);
    expect(screen.getByText(/Каталог фото- и видеотехники/i)).toBeInTheDocument();
  });
  test('should render "NotFoundScreen" when user navigate to non-existent-route', () => {
    history.push('/non-existent-route');
    render(fakeApp);
    expect(screen.getByText(/Страница не найдена/i)).toBeInTheDocument();
  });
  test('should render "BasketScreen" when user navigate to "basket"', () => {
    history.push('/basket');
    render(fakeApp);
    const basketTitle = screen.getAllByText(/Корзина/i);
    expect(basketTitle[0]).toBeInTheDocument();
  });
  test('should render "UserOrderFailScreen" when user navigate to "failorder"', () => {
    history.push('/failorder');
    render(fakeApp);
    const basketTitle = screen.getAllByText(/Ошибка/i);
    expect(basketTitle[0]).toBeInTheDocument();
  });
});
