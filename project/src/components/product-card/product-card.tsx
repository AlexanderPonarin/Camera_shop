import { Link } from 'react-router-dom';
import { Product } from '../../types/products';
import { CSSProperties } from 'react';
import { setAddItemModalViewStatus } from '../../store/modal-view-process/modal-view-process';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { formateProductPrice } from '../../utils/formate-product-price';
import { ProductTabsNameSpace } from '../../consts';
import { getReviews } from '../../store/product-data/selectros';
import { Reviews } from '../../types/reviews';
import { getProductRating } from '../../utils/get-product-rating';
import { getUserProducts } from '../../store/user-process/selectors';

type ProductCardProps = {
  product: Product;
  cb: (product: Product) => void;
  style?: CSSProperties;

}

function ProductCard({product, cb, style}: ProductCardProps): JSX.Element {
  const dispatch = useAppDispatch();
  const reviews = useAppSelector(getReviews);
  const productReviews: Reviews = reviews ? reviews[product.id] : [];
  const productRating = getProductRating(productReviews);
  const userProducts = useAppSelector(getUserProducts);
  const isAddedProduct = userProducts.find((item) => item.product.id === product.id);


  return (
    <div
      style={style}
      className="product-card is-active"
    >
      <div
        className="product-card__img"
      >
        <picture >
          <source
            type="image/webp"
            srcSet={`/${product.previewImgWebp}, /${product.previewImgWebp2x}`}
          />
          <img
            src={`/${product.previewImg}`}
            srcSet={`/${product.previewImg2x}`}
            width="280"
            height="240"
            alt={product.name}
          />
        </picture>
      </div>
      <div className="product-card__info">
        <div className="rate product-card__rate">
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
          <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{product.reviewCount}</p>
        </div>
        <p className="product-card__title">{product.name}</p>
        <p className="product-card__price"><span className="visually-hidden">Цена:</span>{formateProductPrice(product.price)}
        </p>
      </div>
      <div className="product-card__buttons">
        {!isAddedProduct ?
          <button tabIndex={0}
            onClick={() => {
              cb(product);
              dispatch(setAddItemModalViewStatus(true));
            }}
            className="btn btn--purple product-card__btn" type="button"
          >Купить
          </button>
          :
          <Link to={'/basket'}
            className="btn btn--purple-border product-card__btn product-card__btn--in-cart"
          >
            <svg width="16" height="16" aria-hidden="true">
              <use xlinkHref="#icon-basket"></use>
            </svg>В корзине
          </Link>}

        <Link to={`/product/${product.id}/${ProductTabsNameSpace.Description}`}>
          <button tabIndex={-1}
            className="btn btn--transparent"
          >Подробнее
          </button>
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;
