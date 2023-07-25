import { useState } from 'react';
import BasketItem from '../../components/basket-item/basket-item';
import BasketSummary from '../../components/basket-summary/basket-summary';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import Logo from '../../components/logo/logo';
import BasketRemoveProductModal from '../../components/modals/basket-remove-product-modal/basket-remove-product-modal';
import { useAppSelector } from '../../hooks';
import { getUserProducts } from '../../store/user-process/selectors';
import { Product } from '../../types/products';
import ProductBasketSuccessModal from '../../components/modals/product-basket-success-modal/product-basket-success-modal';

function BasketScreen(): JSX.Element {
  const userProducts = useAppSelector(getUserProducts);
  const [productToRemove, setProductToRemove] = useState<Product>({} as Product);

  const setUserProducttoRemoveHandler = (product: Product) => {
    setProductToRemove(product);
  };

  return (
    <>
      <Logo />
      <div className="wrapper">
        <Header />
        <main>
          <div className="page-content">
            <div className="breadcrumbs">
              <div className="container">
                <ul className="breadcrumbs__list">
                  <li className="breadcrumbs__item">
                    <a className="breadcrumbs__link" href="index.html">Главная
                      <svg width="5" height="8" aria-hidden="true">
                        <use xlinkHref="#icon-arrow-mini"></use>
                      </svg>
                    </a>
                  </li>
                  <li className="breadcrumbs__item">
                    <a className="breadcrumbs__link" href="catalog.html">Каталог
                      <svg width="5" height="8" aria-hidden="true">
                        <use xlinkHref="#icon-arrow-mini"></use>
                      </svg>
                    </a>
                  </li>
                  <li className="breadcrumbs__item"><span className="breadcrumbs__link breadcrumbs__link--active">Корзина</span>
                  </li>
                </ul>
              </div>
            </div>
            <section className="basket">
              <div className="container">
                <h1 className="title title--h2">Корзина</h1>
                <ul className="basket__list">
                  {userProducts && userProducts.map((item) =>
                    (
                      <BasketItem
                        key={item.product.id}
                        product={item.product}
                        userQuantity={item.selectedQuantity}
                        onProductToRemoveHandler={setUserProducttoRemoveHandler}
                      />)) }
                </ul>
                <BasketSummary />
              </div>
            </section>
          </div>
        </main>
        <BasketRemoveProductModal product={productToRemove}/>
        <ProductBasketSuccessModal />
        <Footer />
      </div>
    </>
  );
}

export default BasketScreen;
