import { useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { useModalKeyboardEvents } from '../../../hooks/use-modal-keyboard-events';
import useScrollLock from '../../../hooks/use-scroll-lock';
import { Link } from 'react-router-dom';
import { setItemBasketSuccessModalViewStatus } from '../../../store/modal-view-process/modal-view-process';
import { getItemBasketSuccessModalStatus } from '../../../store/modal-view-process/selectors';
import FocusLock from 'react-focus-lock';


function ProductBasketSuccessModal(): JSX.Element {
  const dispatch = useAppDispatch();
  const modalRef = useRef<HTMLDivElement>(null);
  const basketSuccessModalStatus = useAppSelector(getItemBasketSuccessModalStatus);

  useScrollLock();
  useModalKeyboardEvents({ modalRef });

  return (
    <FocusLock disabled={!basketSuccessModalStatus}>
      <div
        className={basketSuccessModalStatus ? 'modal is-active modal--narrow' : 'modal'}
      >
        <div className="modal__wrapper">
          <div
            onClick={() => dispatch(setItemBasketSuccessModalViewStatus(false))}
            className="modal__overlay"
          >
          </div>
          <div
            ref={modalRef}
            className="modal__content"
          >
            <p className="title title--h4">Спасибо за покупку</p>
            <svg className="modal__icon" width="80" height="78" aria-hidden="true">
              <use xlinkHref="#icon-review-success"></use>
            </svg>
            <div className="modal__buttons">
              <Link
                tabIndex={-1}
                to={'/catalog'}
              >
                <button
                  onClick={() => dispatch(setItemBasketSuccessModalViewStatus(false))}
                  className="btn btn--purple modal__btn modal__btn--fit-width" type="button"
                >Вернуться к покупкам
                </button>
              </Link>
            </div>
            <button
              onClick={() => dispatch(setItemBasketSuccessModalViewStatus(false))}
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

export default ProductBasketSuccessModal;
