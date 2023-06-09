import { Route, Routes } from 'react-router-dom';
import BasketScreen from '../../pages/basket-screen/basket-screen';
import CatalogScreen from '../../pages/catalog-screen/catalog-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import browserHistory from '../../types/browser-history';
import HistoryRouter from '../history-route/history-route';
import { useSelector } from 'react-redux';
import { getProducts, getPromoProduct, getQuestionsDataLoadingStatus } from '../../store/product-data/selectros';
import Product from '../product/product';
import LoadingScreen from '../../pages/loading-screen/loading-screen';
import CatalogPage from '../catalog-page/catalog-page';


function App(): JSX.Element {
  const isQuestionsDataLoading = useSelector(getQuestionsDataLoadingStatus);
  const products = useSelector(getProducts);
  const promoProduct = useSelector(getPromoProduct);

  if (isQuestionsDataLoading) {
    return (
      <LoadingScreen />
    );
  }

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

        <Route
          path='catalog/page/:id'
          element={<CatalogPage products={products} promoProduct={promoProduct} />}
        />
      </Routes>
    </HistoryRouter>
  );

}

export default App;
