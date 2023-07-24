import { Route, Routes } from 'react-router-dom';
import BasketScreen from '../../pages/basket-screen/basket-screen';
import CatalogScreen from '../../pages/catalog-screen/catalog-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import { useSelector } from 'react-redux';
import { getProducts, getPromoProduct, getDataLoadingStatus } from '../../store/product-data/selectros';
import Product from '../product/product';
import LoadingScreen from '../../pages/loading-screen/loading-screen';
import UserOrderFailScreen from '../../pages/user-order-fail-screen/user-order-fail-screen';
import { getUserProcessLoadingStatus } from '../../store/user-process/selectors';


function App(): JSX.Element {
  const isDataLoading = useSelector(getDataLoadingStatus);
  const products = useSelector(getProducts);
  const promoProduct = useSelector(getPromoProduct);
  const isUserProcessLoading = useSelector(getUserProcessLoadingStatus);

  if (isDataLoading || isUserProcessLoading) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <Routes>
      <Route
        path={'/'}
        element={<CatalogScreen products={products} promoProduct={promoProduct} />}
      />
      <Route
        path={'/catalog'}
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
        path={'product/:id/:tab'}
        element={<Product products={products} />}
      />
      <Route
        path={'/failorder'}
        element={<UserOrderFailScreen />}
      />
      <Route
        path='*'
        element={<NotFoundScreen />}
      />
    </Routes>
  );

}

export default App;
