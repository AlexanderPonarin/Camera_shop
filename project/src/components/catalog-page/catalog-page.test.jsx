/*import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes} from 'react-router-dom';
import CatalogPage from './catalog-page';
import { store } from '../../store';
import { Provider } from 'react-redux';


describe('CatalogPage', () => {

  const productsMock = [{ id: 1, name: 'Product 1' }, { id: 2, name: 'Product 2' }];
  const promoProductMock = { id: 1, name: 'Promo Product'};

  test('renders CatalogScreen with products and promoProduct', () => {
    const expectedPageId = 1;
    render(
      <MemoryRouter initialEntries={[`catalog/page/${expectedPageId}`]}>
        <Routes>
          <Route
            path='catalog/page/:id'
            element={<CatalogPage products={productsMock} promoProduct={promoProductMock} />}
          >
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(promoProductMock.name)).toBeInTheDocument();
    expect(screen.getByText(productsMock[0].name)).toBeInTheDocument();
    expect(screen.getByText(productsMock[1].name)).toBeInTheDocument();
  });

  test('renders CatalogScreen with products and promoProduct when no page ID is provided', () => {
    render(
      <Provider store={store}>
        <CatalogPage products={productsMock} promoProduct={promoProductMock} />
      </Provider>
    );

    expect(screen.getByText(promoProductMock.name)).toBeInTheDocument();
    expect(screen.getByText(productsMock[0].name)).toBeInTheDocument();
    expect(screen.getByText(productsMock[1].name)).toBeInTheDocument();
  });

  test('renders CatalogScreen without products and promoProduct when none are provided', () => {
    render(
      <Provider store={store}>
        <CatalogPage />
      </Provider>
    );

    expect(screen.queryByText(promoProductMock.name)).toBeNull();
    expect(screen.queryByText(productsMock[0].name)).toBeNull();
    expect(screen.queryByText(productsMock[1].name)).toBeNull();
  });

});
*/