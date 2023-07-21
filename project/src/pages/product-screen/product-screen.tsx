import Footer from '../../components/footer/footer';
import Logo from '../../components/logo/logo';
import Header from '../../components/header/header';
import { Product } from '../../types/products';
import SimilarProducts from '../../components/similar-products/similar-products';
import { useEffect, useState } from 'react';
import AddProductModal from '../../components/modals/add-product-modal/add-product-modal';
import ProductTabs from '../../components/product-tabs/product-tabs';
import ProductReviewList from '../../components/product-review-list/product-review-list';
import ButtonUp from '../../components/button-up/button-up';
import { useAppDispatch } from '../../hooks';
import { setAddItemModalViewStatus } from '../../store/modal-view-process/modal-view-process';
import { Link } from 'react-router-dom';
import ReviewModalSuccess from '../../components/modals/review-modal-success/review-modal-success';
import { fetchReviewsAction } from '../../store/api-action';
import { setActiveProductVenderCode } from '../../store/product-data/product-data';
import { useSelector } from 'react-redux';
import { getActiveProductVenderCode, getProducts, getReviews } from '../../store/product-data/selectros';
import { formateProductPrice } from '../../utils/formate-product-price';
import { Reviews } from '../../types/reviews';
import { getProductRating } from '../../utils/get-product-rating';
import AddProductSuccessModal from '../../components/modals/add-product-success-modal/add-product-success-modal';

type ProductScreenProps = {
  product: Product;
};

function ProductScreen({product}: ProductScreenProps): JSX.Element {
  const [productInAddModal, setProductInAddModal] = useState<Product>(product);
  const dispatch = useAppDispatch();
  const activeVenderCode = useSelector(getActiveProductVenderCode);
  const products = useSelector(getProducts);
  const reviews = useSelector(getReviews);
  const productReviews: Reviews = reviews ? reviews[product.id] : [];
  const productRating = getProductRating(productReviews) || 0;

  useEffect(() => {
    if (activeVenderCode !== product.vendorCode) {
      dispatch(fetchReviewsAction(product.id));
      dispatch(setActiveProductVenderCode(product.vendorCode));
      for(let i = 0; i < products.length; i++) {
        dispatch(fetchReviewsAction(products[i].id));
      }
    }
  }, [activeVenderCode, dispatch, product.id, product.vendorCode]);


  const onBasketClick = (item: Product) => {
    dispatch(setAddItemModalViewStatus(true));
    setProductInAddModal(item);
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
                    <Link to={'/'} className="breadcrumbs__link">Главная
                      <svg width="5" height="8" aria-hidden="true">
                        <use xlinkHref="#icon-arrow-mini"></use>
                      </svg>
                    </Link>
                  </li>
                  <li className="breadcrumbs__item">
                    <Link to={'/'} className="breadcrumbs__link" >Каталог
                      <svg width="5" height="8" aria-hidden="true">
                        <use xlinkHref="#icon-arrow-mini"></use>
                      </svg>
                    </Link >
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
                        <use xlinkHref={`#icon-${productRating >= 1 ? 'full-star' : 'star' }`}></use>
                      </svg>
                      <svg width="17" height="16" aria-hidden="true">
                        <use xlinkHref={`#icon-${productRating >= 2 ? 'full-star' : 'star' }`}></use>
                      </svg>
                      <svg width="17" height="16" aria-hidden="true">
                        <use xlinkHref={`#icon-${productRating >= 3 ? 'full-star' : 'star' }`}></use>
                      </svg>
                      <svg width="17" height="16" aria-hidden="true">
                        <use xlinkHref={`#icon-${productRating >= 4 ? 'full-star' : 'star' }`}></use>
                      </svg>
                      <svg width="17" height="16" aria-hidden="true">
                        <use xlinkHref={`#icon-${productRating === 5 ? 'full-star' : 'star' }`}></use>
                      </svg>
                      <p className="visually-hidden">Рейтинг: {productRating}</p>
                      <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{productReviews?.length}</p>
                    </div>
                    <p className="product__price"><span className="visually-hidden">Цена:</span>{formateProductPrice(product.price)}</p>
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
              {productReviews?.length && <ProductReviewList product={product}/>}
            </div>
          </div>
        </main>
        <ButtonUp />
        <AddProductModal product={productInAddModal} />
        <ReviewModalSuccess />
        <AddProductSuccessModal isProductScreenModal/>
        <Footer />
      </div>
    </>
  );
}

export default ProductScreen;
