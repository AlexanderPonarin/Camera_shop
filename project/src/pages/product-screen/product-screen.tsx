import Footer from '../../components/footer/footer';
import HeaderLogo from '../../components/header-logo/header-logo';
import Header from '../../components/header/header';
import { Product } from '../../types/products';
import SimilarProducts from '../../components/similar-products/similar-products';
import { useState } from 'react';
import AddProductModal from '../../components/modals/add-product-modal';
import ProductTabs from '../../components/product-tabs/product-tabs';
import ProductReviewList from '../../components/product-review-list/product-review-list';
import ButtonUp from '../../components/button-up/button-up';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getAddItemModalStatus } from '../../store/modal-view-process/selectors';
import { setAddItemModalViewStatus } from '../../store/modal-view-process/modal-view-process';

type ProductScreenProps = {
  product: Product;
};

function ProductScreen({product}: ProductScreenProps): JSX.Element {
  const [productInAddModal, setProductInAddModal] = useState<Product>(product);
  const dispatch = useAppDispatch();
  const addItemModalViewStatus = useAppSelector(getAddItemModalStatus);


  const onBasketClick = (item: Product) => {
    dispatch(setAddItemModalViewStatus(true));
    setProductInAddModal(item);
  };

  return (
    <>
      <HeaderLogo />
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
                  <li className="breadcrumbs__item">
                    <span className="breadcrumbs__link breadcrumbs__link--active">{product.name}</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="page-content__section">
              <section className="product">
                <div className="container">
                  <div className="product__img">
                    <picture>
                      <source type="image/webp" srcSet={`/${product.previewImgWebp}, /${product.previewImgWebp2x}`}/>
                      <img
                        src={`/${window.location.origin}${product.previewImg}`}
                        srcSet={`/${product.previewImg2x}`}
                        width="560" height="480"
                        alt={product.name}
                      />
                    </picture>
                  </div>
                  <div className="product__content">
                    <h1 className="title title--h3">{product.name}</h1>
                    <div className="rate product__rate">
                      <svg width="17" height="16" aria-hidden="true">
                        <use xlinkHref="#icon-full-star"></use>
                      </svg>
                      <svg width="17" height="16" aria-hidden="true">
                        <use xlinkHref="#icon-full-star"></use>
                      </svg>
                      <svg width="17" height="16" aria-hidden="true">
                        <use xlinkHref="#icon-full-star"></use>
                      </svg>
                      <svg width="17" height="16" aria-hidden="true">
                        <use xlinkHref="#icon-full-star"></use>
                      </svg>
                      <svg width="17" height="16" aria-hidden="true">
                        <use xlinkHref="#icon-star"></use>
                      </svg>
                      <p className="visually-hidden">Рейтинг: 4</p>
                      <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{product.reviewCount}</p>
                    </div>
                    <p className="product__price"><span className="visually-hidden">Цена:</span>{product.price}₽</p>
                    <button
                      onClick={() => dispatch(setAddItemModalViewStatus(true))}
                      className="btn btn--purple" type="button"
                    >
                      <svg width="24" height="16" aria-hidden="true">
                        <use xlinkHref="#icon-add-basket"></use>
                      </svg>Добавить в корзину
                    </button>
                    <ProductTabs product={product} />
                  </div>
                </div>
              </section>
            </div>
            <div className="page-content__section">

              <SimilarProducts product={product} cb={onBasketClick}/>

            </div>
            <div className="page-content__section">
              <ProductReviewList product={product}/>
            </div>
          </div>
        </main>
        <ButtonUp />
        {addItemModalViewStatus && <AddProductModal product={productInAddModal} />}
        <Footer />
      </div>
    </>
  );
}

export default ProductScreen;
