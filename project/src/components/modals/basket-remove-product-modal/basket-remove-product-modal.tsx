import { useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { useModalKeyboardEvents } from '../../../hooks/use-modal-keyboard-events';
import useScrollLock from '../../../hooks/use-scroll-lock';
import { getBasketRemoveItemModalStatus } from '../../../store/modal-view-process/selectors';
import { Product } from '../../../types/products';
import { getUserProducts } from '../../../store/user-process/selectors';
import { setBasketRemoveItemModalViewStatus } from '../../../store/modal-view-process/modal-view-process';
import { removeUserProduct } from '../../../utils/remove-user-product';
import { setUserProducts } from '../../../store/user-process/user-process';
import FocusLock from 'react-focus-lock';


type BasketRemoveProductModalProps = {
  product: Product;
}

function BasketRemoveProductModal({product}: BasketRemoveProductModalProps): JSX.Element {
  const dispatch = useAppDispatch();
  const modalRef = useRef<HTMLDivElement>(null);
  const userProducts = useAppSelector(getUserProducts);
  const removeModalStatus = useAppSelector(getBasketRemoveItemModalStatus);

  useScrollLock();
  useModalKeyboardEvents({ modalRef });

  const removeBtnClickHandler = () => {
    dispatch(setUserProducts(removeUserProduct({userProducts, product})));
    dispatch(setBasketRemoveItemModalViewStatus(false));
  };


  return (
    <FocusLock disabled={!removeModalStatus}>
      <div
        className={removeModalStatus ? 'modal is-active' : 'modal'}
      >
        <div className="modal__wrapper">
          <div
            onClick={() => dispatch(setBasketRemoveItemModalViewStatus(false))}
            className="modal__overlay"
          >
          </div>
          <div
            ref={modalRef}
            className="modal__content"
          >
            <p className="title title--h4">Удалить этот товар?</p>
            <div className="basket-item basket-item--short">
              <div className="basket-item__img">
                <picture>
                  <source
                    type="image/webp"
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
                  <li className="basket-item__list-item"><span className="basket-item__article">Артикул:</span>
                    <span className="basket-item__number">{product.vendorCode}</span>
                  </li>
                  <li className="basket-item__list-item">{`${product.type} ${product.category}`}</li>
                  <li className="basket-item__list-item">{`${product.level} уровень`}</li>
                </ul>
              </div>
            </div>
            <div className="modal__buttons">
              <button
                onClick={removeBtnClickHandler}
                className="btn btn--purple modal__btn modal__btn--half-width"
                type="button"
              >
              Удалить
              </button>
              <button
                tabIndex={0}
                onClick={() => dispatch(setBasketRemoveItemModalViewStatus(false))}
                className="btn btn--transparent modal__btn modal__btn--half-width"
              >Продолжить покупки
              </button>
            </div>
            <button
              onClick={() => dispatch(setBasketRemoveItemModalViewStatus(false))}
              className="cross-btn" type="button" aria-label="Закрыть попап"
            >
              <svg width="10" height="10" aria-hidden="true">
                <use xlinkHref="#icon-close"></use>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </FocusLock>
  );
}

export default BasketRemoveProductModal;
