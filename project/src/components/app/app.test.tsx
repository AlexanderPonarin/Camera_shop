import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import HistoryRouter from '../history-route/history-route';
import App from './app';


const mockStore = configureMockStore();

const store = mockStore({
  DATA: {
    isProductsDataLoading: false,
  },
  MODALVIEW: {
    addItemModalViewStatus: false
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
});
