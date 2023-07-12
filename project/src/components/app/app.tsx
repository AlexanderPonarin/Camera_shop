import { Route, Routes } from 'react-router-dom';
import BasketScreen from '../../pages/basket-screen/basket-screen';
import CatalogScreen from '../../pages/catalog-screen/catalog-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import { useSelector } from 'react-redux';
import { getProducts, getPromoProduct, getDataLoadingStatus } from '../../store/product-data/selectros';
import Product from '../product/product';
import LoadingScreen from '../../pages/loading-screen/loading-screen';
import CatalogPage from '../catalog-page/catalog-page';
import { useAppDispatch } from '../../hooks';
import { fetchReviewsAction } from '../../store/api-action';
import { useEffect } from 'react';
import { store } from '../../store';


function App(): JSX.Element {
  const isDataLoading = useSelector(getDataLoadingStatus);
  const products = useSelector(getProducts);
  const promoProduct = useSelector(getPromoProduct);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if(products) {
      for(let i = 0; i < products.length; i++) {
        store.dispatch(fetchReviewsAction(products[i].id));
      }
    }
  },[dispatch, products]);


  if (isDataLoading) {
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
        path='*'
        element={<NotFoundScreen />}
      />

      <Route
        path='catalog/page/:id/'
        element={<CatalogPage products={products} promoProduct={promoProduct} />}
      />
    </Routes>
  );

}

export default App;
