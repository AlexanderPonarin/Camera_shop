import { Link } from 'react-router-dom';
import { PromoProduct } from '../../types/promo-product';

type BannerProps = {
  promoProduct: PromoProduct;
  productDescription?: string;
}

function Banner({promoProduct, productDescription}: BannerProps): JSX.Element { return (
  <div className="banner">
    <picture>
      <source
        type="image/webp"
        srcSet={`/${promoProduct.previewImgWebp}, /${promoProduct.previewImgWebp2x}`}
      />
      <img
        src={`/${promoProduct.previewImg}`}
        srcSet={`/${promoProduct.previewImg2x}`}
        width="1280"
        height="280"
        alt="баннер"
      />
    </picture>
    <p className="banner__info">
      <span className="banner__message">Новинка!</span>
      <span className="title title--h1">{promoProduct.name}</span>
      <span className="banner__text">{productDescription ? productDescription : ''}</span>
      <Link to={`/product/${promoProduct.id}`}>
        <button className="btn">Подробнее</button>
      </Link>
    </p>
  </div>
);
}

export default Banner;
