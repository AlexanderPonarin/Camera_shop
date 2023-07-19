import { useEffect, useState } from 'react';
import { useAppSelector } from '../../hooks';
import { getUserProducts } from '../../store/user-process/selectors';
import { formateProductPrice } from '../../utils/formate-product-price';


function BasketSummary(): JSX.Element {
  const userProducts = useAppSelector(getUserProducts);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    if(userProducts) {
      let total = 0;
      for(const userProduct of userProducts) {
        total += userProduct.product.price * userProduct.selectedQuantity;
      }
      setTotalPrice(total);
    }
  },[userProducts]);

  return (
    <div className="basket__summary">
      <div className="basket__promo">
        <p className="title title--h4">Если у вас есть промокод на скидку, примените его в этом поле</p>
        <div className="basket-form">
          <form action="#">
            <div className="custom-input">
              <label><span className="custom-input__label">Промокод</span>
                <input type="text" name="promo" placeholder="Введите промокод"/>
              </label>
              <p className="custom-input__error">Промокод неверный</p>
              <p className="custom-input__success">Промокод принят!</p>
            </div>
            <button className="btn" type="submit">Применить
            </button>
          </form>
        </div>
      </div>
      <div className="basket__summary-order">
        <p className="basket__summary-item">
          <span className="basket__summary-text">Всего:</span>
          <span className="basket__summary-value">{formateProductPrice(totalPrice) || '0 ₽'}</span>
        </p>
        <p className="basket__summary-item"><span className="basket__summary-text">Скидка:</span>
          <span className="basket__summary-value basket__summary-value--bonus">0 ₽</span>
        </p>
        <p className="basket__summary-item">
          <span className="basket__summary-text basket__summary-text--total">К оплате:</span>
          <span className="basket__summary-value basket__summary-value--total">111 390 ₽</span>
        </p>
        <button className="btn btn--purple" type="submit">Оформить заказ
        </button>
      </div>
    </div>
  );
}

export default BasketSummary;
