import { useEffect, useState } from 'react';
import { Product } from '../../types/products';
import { formateProductPrice } from '../../utils/formate-product-price';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setUserProducts } from '../../store/user-process/user-process';
import { getUserProducts } from '../../store/user-process/selectors';
import { changeUserProductQuantity } from '../../utils/change-user-product-quantity';
import { setBasketRemoveItemModalViewStatus } from '../../store/modal-view-process/modal-view-process';

type BasketItemProps = {
    product: Product;
    userQuantity: number;
    onProductToRemoveHandler: (product: Product) => void;
}

function BasketItem({product, userQuantity, onProductToRemoveHandler}: BasketItemProps): JSX.Element {
  const [productCount, setProductCount] = useState<number>(userQuantity);
  const [totalPrice, setTotalPrice] = useState<number>(product.price * userQuantity);
  const userProducts = useAppSelector(getUserProducts);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setUserProducts(changeUserProductQuantity({userProducts, product, quantity: productCount})));
  },[productCount]);


  useEffect(() => {
    setTotalPrice(productCount * product.price);
  },[product.price, productCount]);


  const onInputCounterChangeHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = Number(evt.target.value);
    if(Number(inputValue) > 99) {
      inputValue = 99;
    }
    if(Number(inputValue) < 1) {
      inputValue = 1;
    }
    setProductCount(inputValue);
  };

  const onIncreaseBtnClickHandler = () => {
    if(productCount >= 1 && productCount < 99) {
      setProductCount(productCount + 1);
      setTotalPrice(product.price * (productCount + 1));
    }
  };

  const onDecreaseBtnClickHandler = () => {
    if(productCount > 1 && productCount <= 99) {
      setProductCount(productCount - 1);
      setTotalPrice(product.price * (productCount - 1));
    }
  };

  const removeBtnClickHandler = () => {
    onProductToRemoveHandler(product);
    dispatch(setBasketRemoveItemModalViewStatus(true));
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
            <span className="basket-item__number"> {product.vendorCode}</span>
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
      <button
        onClick={removeBtnClickHandler}
        className="cross-btn" type="button" aria-label="Удалить товар"
      >
        <svg width="10" height="10" aria-hidden="true">
          <use xlinkHref="#icon-close"></use>
        </svg>
      </button>
    </li>
  );
}

export default BasketItem;
