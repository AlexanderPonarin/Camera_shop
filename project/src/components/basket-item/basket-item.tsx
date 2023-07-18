import { useState } from 'react';
import { Product } from '../../types/products';
import { formateProductPrice } from '../../utils/formate-product-price';

type BasketItemProps = {
    product: Product;
    userQuantity: number;
}

function BasketItem({product, userQuantity}: BasketItemProps): JSX.Element {
  const [productCount, setProductCount] = useState<number>(userQuantity);
  const [totalPrice, setTotalPrice] = useState<number>(product.price * userQuantity);

  const onInputCounterChangeHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setProductCount(Number(evt.target.value));
  };

  const onIncreaseBtnClickHandler = () => {
    setProductCount(productCount + 1);
    setTotalPrice(product.price * productCount);
  };

  const onDecreaseBtnClickHandler = () => {
    setProductCount(productCount - 1);
    setTotalPrice(product.price * productCount);
  };

  return (
    <li className="basket-item">
      <div className="basket-item__img">
        <picture>
          <source type="image/webp"
            srcSet={`/${product.previewImgWebp}, /${product.previewImgWebp2x}`}
          />
          <img
            src={`/${product.previewImg}`}
            srcSet={`/${product.previewImg2x}`}
            width="140"
            height="120"
            alt={product.name}
          />
        </picture>
      </div>
      <div className="basket-item__description">
        <p className="basket-item__title">{product.name}</p>
        <ul className="basket-item__list">
          <li className="basket-item__list-item">
            <span className="basket-item__article">Артикул:</span>
            <span className="basket-item__number">{product.vendorCode}</span>
          </li>
          <li className="basket-item__list-item">{`${product.type} ${product.category}`}</li>
          <li className="basket-item__list-item">{`${product.level} уровень`}</li>
        </ul>
      </div>
      <p className="basket-item__price"><span className="visually-hidden">Цена:</span>{formateProductPrice(product.price)}</p>
      <div className="quantity">
        <button
          onClick={onDecreaseBtnClickHandler}
          className="btn-icon btn-icon--prev" aria-label="уменьшить количество товара"
        >
          <svg width="7" height="12" aria-hidden="true">
            <use xlinkHref="#icon-arrow"></use>
          </svg>
        </button>
        <label className="visually-hidden" htmlFor="counter1"></label>
        <input
          onChange={(evt) => onInputCounterChangeHandler(evt)}
          value={productCount}
          type="number" id="counter1" min="1" max="99" aria-label="количество товара"
        />
        <button
          onClick={onIncreaseBtnClickHandler}
          className="btn-icon btn-icon--next" aria-label="увеличить количество товара"
        >
          <svg width="7" height="12" aria-hidden="true">
            <use xlinkHref="#icon-arrow"></use>
          </svg>
        </button>
      </div>
      <div className="basket-item__total-price">
        <span className="visually-hidden">Общая цена:</span>{formateProductPrice(totalPrice)}
      </div>
      <button className="cross-btn" type="button" aria-label="Удалить товар">
        <svg width="10" height="10" aria-hidden="true">
          <use xlinkHref="#icon-close"></use>
        </svg>
      </button>
    </li>
  );
}

export default BasketItem;


