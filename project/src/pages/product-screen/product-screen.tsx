import { useDispatch, useSelector } from 'react-redux';
import Footer from '../../components/footer/footer';
import HeaderLogo from '../../components/header-logo/header-logo';
import Header from '../../components/header/header';
import { Product } from '../../types/products';
import { fetchSimilarProductsAction } from '../../store/api-action';
import { getSimilarProducts } from '../../store/product-data/selectros';
import SimilarProducts from '../../components/similar-products/similar-products';
import { useEffect, useState } from 'react';
import AddProductModal from '../../components/modals/add-product-modal';
import { AppDispatch } from '../../types/state';

type ProductScreenProps = {
  product: Product;
};

function ProductScreen({product}: ProductScreenProps): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const similarProducts = useSelector(getSimilarProducts);
  const [addModalOpen, setAddModalActive] = useState(false);
  const [productInAddModal, setProductInAddModal] = useState<Product>(product);


  const onBasketClick = (item: Product) => {
    setAddModalActive(true);
    setProductInAddModal(item);
  };

  const onCloseBtnClick = () => {
    setAddModalActive(false);
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
                  <li className="breadcrumbs__item"><span className="breadcrumbs__link breadcrumbs__link--active">{product.name}</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="page-content__section">
              <section className="product">
                <div className="container">
                  <div className="product__img">
                    <picture>
                      <source type="image/webp" srcSet={`${product.previewImgWebp}, ${product.previewImgWebp2x}`}/>
                      <img src={`${window.location.origin}${product.previewImg}`} srcSet={product.previewImg2x} width="560" height="480" alt={product.name}/>
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
                    <button className="btn btn--purple" type="button">
                      <svg width="24" height="16" aria-hidden="true">
                        <use xlinkHref="#icon-add-basket"></use>
                      </svg>Добавить в корзину
                    </button>
                    <div className="tabs product__tabs">
                      <div className="tabs__controls product__tabs-controls">
                        <button className="tabs__control" type="button">Характеристики</button>
                        <button className="tabs__control is-active" type="button">Описание</button>
                      </div>
                      <div className="tabs__content">
                        <div className="tabs__element">
                          <ul className="product__tabs-list">
                            <li className="item-list"><span className="item-list__title">Артикул:</span>
                              <p className="item-list__text"> {product.vendorCode}</p>
                            </li>
                            <li className="item-list"><span className="item-list__title">Категория:</span>
                              <p className="item-list__text">{product.type}</p>
                            </li>
                            <li className="item-list"><span className="item-list__title">Тип камеры:</span>
                              <p className="item-list__text">{product.category}</p>
                            </li>
                            <li className="item-list"><span className="item-list__title">Уровень:</span>
                              <p className="item-list__text">{product.level}</p>
                            </li>
                          </ul>
                        </div>
                        <div className="tabs__element is-active">
                          <div className="product__tabs-text">
                            <p>{product.description}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
            <div className="page-content__section">
              <section className="product-similar">
                <SimilarProducts productId={product.id} cb={onBasketClick}/>
              </section>
            </div>
            <div className="page-content__section">
            </div>
          </div>
        </main>
        <a className="up-btn" href="#header">
          <svg width="12" height="18" aria-hidden="true">
            <use xlinkHref="#icon-arrow2"></use>
          </svg>
        </a>
        {addModalOpen && <AddProductModal product={productInAddModal} cb={onCloseBtnClick}/>}
        <Footer />
      </div>
    </>
  );
}

export default ProductScreen;
