import { useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { useModalKeyboardEvents } from '../../../hooks/use-modal-keyboard-events';
import useScrollLock from '../../../hooks/use-scroll-lock';
import { setAddItemModalViewStatus, setAddItemSuccessModalViewStatus } from '../../../store/modal-view-process/modal-view-process';
import { getAddItemModalStatus } from '../../../store/modal-view-process/selectors';
import { Product } from '../../../types/products';
import { formateProductPrice } from '../../../utils/formate-product-price';
import { setUserProducts } from '../../../store/user-process/user-process';
import { getUserProducts } from '../../../store/user-process/selectors';
import { addUserProduct } from '../../../utils/add-user-product';
import FocusLock from 'react-focus-lock';


type AddProductModalProps = {
  product: Product;
}

function AddProductModal({product}: AddProductModalProps): JSX.Element {
  const dispatch = useAppDispatch();
  const modalRef = useRef<HTMLDivElement>(null);
  const addItemModalViewStatus = useAppSelector(getAddItemModalStatus);
  const userProducts = useAppSelector(getUserProducts);

  useScrollLock();
  useModalKeyboardEvents({ modalRef });

  return (
    <FocusLock disabled={!addItemModalViewStatus}>
      <div
        data-testid="add-product-modal"
        className={addItemModalViewStatus ? 'modal is-active' : 'modal'}
      >
        <div className="modal__wrapper">
          <div
            onClick={() => dispatch(setAddItemModalViewStatus(false))}
            className="modal__overlay"
          >
          </div>
          <div
            ref={modalRef}
            className="modal__content"
          >
            <p className="title title--h4">Добавить товар в корзину</p>
            <div className="basket-item basket-item--short">
              <div className="basket-item__img">
                <picture>
                  <source type="image/webp" srcSet={`/${product.previewImgWebp}, /${product.previewImgWebp2x}`}/>
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
                  <li className="basket-item__list-item">{product.type}</li>
                  <li className="basket-item__list-item">{product.level}</li>
                </ul>
                <p className="basket-item__price"><span className="visually-hidden">Цена:</span>{formateProductPrice(product.price)}</p>
              </div>
            </div>
            <div className="modal__buttons">
              <button
                autoFocus
                onClick={() => {
                  dispatch(setAddItemModalViewStatus(false));
                  dispatch(setUserProducts(addUserProduct({userProducts, product})));
                  dispatch(setAddItemSuccessModalViewStatus(true));}}
                className="btn btn--purple modal__btn modal__btn--fit-width" type="button" tabIndex={-2}
              >
                <svg width="24" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-add-basket"></use>
                </svg>Добавить в корзину
              </button>
            </div>
            <button
              autoFocus
              onClick={() => dispatch(setAddItemModalViewStatus(false))}
              className="cross-btn"
              type="button"
              aria-label="Закрыть попап"
              tabIndex={0}
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

export default AddProductModal;
