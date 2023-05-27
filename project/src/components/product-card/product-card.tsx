import { Link } from 'react-router-dom';
import { Product } from '../../types/products';

type ProductCardProps = {
  product: Product;
}

function ProductCard({product}: ProductCardProps): JSX.Element {
  return (
    <div
      className="product-card"
    >
      <div
        className="product-card__img"
      >
        <picture
          onClick={() => {
            <Link to={`/product/${product.id}`} />;
          }}
        >
          <source
            type="image/webp"
            srcSet={`${product.previewImgWebp}, ${product.previewImgWebp2x}`}
          />
          <img
            src={product.previewImg}
            srcSet={product.previewImg2x}
            width="280"
            height="240"
            alt="Ретрокамера «Das Auge IV»"
          />
        </picture>
      </div>
      <div className="product-card__info">
        <div className="rate product-card__rate">
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
          <svg width="17" height="16" aria-hidden="true">
            <use xlinkHref="#icon-star"></use>
          </svg>
          <p className="visually-hidden">Рейтинг: 3</p>
          <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{product.reviewCount}</p>
        </div>
        <p className="product-card__title">{product.name}</p>
        <p className="product-card__price"><span className="visually-hidden">Цена:</span>{product.price}
        </p>
      </div>
      <div className="product-card__buttons">
        <button className="btn btn--purple product-card__btn" type="button">Купить
        </button>
        <a className="btn btn--transparent" href="#">Подробнее
        </a>
      </div>
    </div>
  );
}

export default ProductCard;
