import { useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { useModalKeyboardEvents } from '../../../hooks/use-modal-keyboard-events';
import useScrollLock from '../../../hooks/use-scroll-lock';
import { getAddItemSuccessModalStatus } from '../../../store/modal-view-process/selectors';
import { setAddItemSuccessModalViewStatus } from '../../../store/modal-view-process/modal-view-process';
import { Link } from 'react-router-dom';

function AddProductSuccessModal(): JSX.Element {
  const dispatch = useAppDispatch();
  const modalRef = useRef<HTMLDivElement>(null);
  const addItemSuccessStatus = useAppSelector(getAddItemSuccessModalStatus);

  useScrollLock();
  useModalKeyboardEvents({ modalRef });


  return (
    <div
      className={addItemSuccessStatus ? 'modal is-active modal--narrow' : 'modal'}
      onClick={() => dispatch(setAddItemSuccessModalViewStatus(false))}
    >
      <div className="modal__wrapper">
        <div className="modal__overlay"></div>
        <div className="modal__content">
          <p className="title title--h4">Товар успешно добавлен в корзину</p>
          <svg className="modal__icon" width="86" height="80" aria-hidden="true">
            <use xlinkHref="#icon-success"></use>
          </svg>
          <div className="modal__buttons">
            <a
              onClick={() => dispatch(setAddItemSuccessModalViewStatus(false))}
              className="btn btn--transparent modal__btn"
            >Продолжить покупки
            </a>
            <Link to={'/basket'} >
              <button
                onClick={() => dispatch(setAddItemSuccessModalViewStatus(false))}
                className="btn btn--purple modal__btn modal__btn--fit-width"
              >Перейти в корзину
              </button>
            </Link>
          </div>
          <button
            onClick={() => dispatch(setAddItemSuccessModalViewStatus(false))}
            className="cross-btn" type="button" aria-label="Закрыть попап"
          >
            <svg width="10" height="10" aria-hidden="true">
              <use xlinkHref="#icon-close"></use>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddProductSuccessModal;
