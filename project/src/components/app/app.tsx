import { Route, Routes } from 'react-router-dom';
import BasketScreen from '../../pages/basket-screen/basket-screen';
import CatalogScreen from '../../pages/catalog-screen/catalog-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import browserHistory from '../../types/browser-history';
import HistoryRouter from '../history-route/history-route';
import { useSelector } from 'react-redux';
import { getProducts, getPromoProduct } from '../../store/product-data/selectros';
import Product from '../product/product';


function App(): JSX.Element {

  const products = useSelector(getProducts);
  const promoProduct = useSelector(getPromoProduct);

  return (
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route
          path={'/'}
          element={<CatalogScreen products={products} promoProduct={promoProduct} />}
        />

        <Route
          path={'basket'}
          element={<BasketScreen />}
        />

        <Route
          path='product/:id'
          element={<Product products={products} />}
        />

        <Route
          path='*'
          element={<NotFoundScreen />}
        />
      </Routes>
    </HistoryRouter>
  );

}

export default App;
