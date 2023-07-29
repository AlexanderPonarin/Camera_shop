import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getCouponBonus, getInvalidCouponStatus, getUserProducts, getValidCouponStatus } from '../../store/user-process/selectors';
import { formateProductPrice } from '../../utils/formate-product-price';
import { useForm } from 'react-hook-form';
import { PromoCode } from '../../types/promoCode';
import { sendOrderAction, sendPromoCodeAction } from '../../store/api-action';
import { UserOrder } from '../../types/user-order';
import { Coupon } from '../../consts';
import { setInvalidCouponStatus } from '../../store/user-process/user-process';
import { setValidCouponStatus } from '../../store/user-process/user-process';


function BasketSummary(): JSX.Element {
  const userProducts = useAppSelector(getUserProducts);
  const bonus = useAppSelector(getCouponBonus);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [totalPriceWithBonus, setTotalPriceWithBonus] = useState<number>(0);
  const [bonusPrice, setBonusPrice] = useState<number>(0);
  const isValidCoupon = useAppSelector(getValidCouponStatus);
  const isInvalidCoupon = useAppSelector(getInvalidCouponStatus);
  const [couponValue, setCouponValue] = useState<string>('');


  const { register, handleSubmit, reset, formState: { errors } } = useForm<PromoCode>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if(userProducts) {
      let total = 0;
      for(const userProduct of userProducts) {
        total += userProduct.product.price * userProduct.selectedQuantity;
      }
      setTotalPrice(total);
    }
  },[userProducts]);

  useEffect(() => {
    if(bonus > 0) {
      setBonusPrice(totalPrice - totalPriceWithBonus);
    }
    const discount = Math.ceil(totalPrice / 100 * bonus);
    setTotalPriceWithBonus(Math.ceil(totalPrice - discount));
  },[bonus, totalPrice, totalPriceWithBonus]);


  const onSubmit = (data: PromoCode) => {
    if (data.coupon.includes(' ')) {
      dispatch(setValidCouponStatus(false));
      dispatch(setInvalidCouponStatus(true));
    } else {
      setCouponValue(data.coupon);
      dispatch(sendPromoCodeAction(data));
      reset();
      setCouponValue('');
    }
  };

  const validateCouponInputView = (validStatus: boolean, invalidStatus: boolean) => {
    const classNameString = 'custom-input';
    if(!validStatus && !invalidStatus) {
      return classNameString;
    }
    if(validStatus && !invalidStatus) {
      return `${classNameString} is-valid`;
    }
    if(invalidStatus && !validStatus) {
      return `${classNameString} is-invalid`;
    }
  };

  const onCheckoutBtnClickHandler = () => {
    const order: UserOrder = {
      camerasIds: userProducts.map((item) => item.product.id),
      coupon: bonus > 0 ? Coupon[`${bonus.toString()}procent` as keyof typeof Coupon] : null
    };
    dispatch(sendOrderAction(order));
  };

  const onUseCouponBtnClickHandler = () => {
    if (couponValue.includes(' ')) {
      dispatch(setInvalidCouponStatus(true));
    }
  };


  return (
    <div className="basket__summary">
      <div className="basket__promo">
        <p className="title title--h4">Если у вас есть промокод на скидку, примените его в этом поле</p>
        <div className="basket-form">
          <form
            onSubmit={(event) =>
              void handleSubmit(onSubmit)(event)}
            action="#"
          >
            <div className={validateCouponInputView(isValidCoupon, isInvalidCoupon)}>
              <label>
                <span className="custom-input__label">
                Промокод
                  {errors.coupon &&
                <svg width="9" height="9" aria-hidden="true">
                  <use xlinkHref="#icon-snowflake"></use>
                </svg>}
                </span>
                <input
                  {...register('coupon',
                    {required: true})}
                  type="text" name="coupon" placeholder="Введите промокод"
                />
              </label>

              <p className="custom-input__error">Промокод неверный</p>
              <p className="custom-input__success">Промокод принят!</p>
            </div>
            <button
              onClick={onUseCouponBtnClickHandler}
              className="btn" type="submit"
            >Применить
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
          <span className={bonus > 0 && userProducts.length ?
            'basket__summary-value basket__summary-value--bonus'
            :
            'basket__summary-value'}
          >{(formateProductPrice(bonusPrice)) || '0 ₽'}
          </span>
        </p>
        <p className="basket__summary-item">
          <span className="basket__summary-text basket__summary-text--total">К оплате:</span>
          <span className="basket__summary-value basket__summary-value--total">{formateProductPrice(totalPriceWithBonus) || '0 ₽'}</span>
        </p>
        <button
          onClick={onCheckoutBtnClickHandler}
          className="btn btn--purple" type="submit"
        >Оформить заказ
        </button>
      </div>
    </div>
  );
}

export default BasketSummary;
