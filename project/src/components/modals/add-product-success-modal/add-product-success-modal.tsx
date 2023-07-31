import { useRef, KeyboardEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { useModalKeyboardEvents } from '../../../hooks/use-modal-keyboard-events';
import useScrollLock from '../../../hooks/use-scroll-lock';
import { getAddItemSuccessModalStatus } from '../../../store/modal-view-process/selectors';
import { setAddItemSuccessModalViewStatus } from '../../../store/modal-view-process/modal-view-process';
import { Link } from 'react-router-dom';
import FocusLock from 'react-focus-lock';
import { redirectToRoute } from '../../../store/actions';


type AddProductSuccessModalProps = {
  isProductScreenModal?: boolean;
}

function AddProductSuccessModal({isProductScreenModal}: AddProductSuccessModalProps): JSX.Element {
  const dispatch = useAppDispatch();
  const modalRef = useRef<HTMLDivElement>(null);
  const addItemSuccessStatus = useAppSelector(getAddItemSuccessModalStatus);

  useScrollLock();
  useModalKeyboardEvents({ modalRef });

  const onKeyDownPressHandler = (evt: KeyboardEvent<HTMLAnchorElement>) => {
    if (evt.code === 'Enter') {
      dispatch(setAddItemSuccessModalViewStatus(false));
    }
  };

  return (
    <FocusLock disabled={!addItemSuccessStatus}>
      <div
        className={addItemSuccessStatus ? 'modal is-active modal--narrow' : 'modal'}
      >
        <div className="modal__wrapper">
          <div
            onClick={() => dispatch(setAddItemSuccessModalViewStatus(false))}
            className="modal__overlay"
          >
          </div>
          <div
            ref={modalRef}
            className="modal__content"
          >
            <p className="title title--h4">Товар успешно добавлен в корзину</p>
            <svg className="modal__icon" width="86" height="80" aria-hidden="true">
              <use xlinkHref="#icon-success"></use>
            </svg>
            <div className="modal__buttons">
              {isProductScreenModal ?
                <Link to={'/catalog'}
                  onClick={() => dispatch(setAddItemSuccessModalViewStatus(false))}
                  className="btn btn--transparent modal__btn"
                  tabIndex={0}
                >Продолжить покупки
                </Link>
                :
                <a
                  onClick={() => dispatch(setAddItemSuccessModalViewStatus(false))}
                  className="btn btn--transparent modal__btn"
                  tabIndex={0}
                  onKeyDown={onKeyDownPressHandler}
                >Продолжить покупки
                </a>}
              <button
                onClick={() =>
                {dispatch(setAddItemSuccessModalViewStatus(false));
                  dispatch(redirectToRoute('/basket'));
                }}
                className="btn btn--purple modal__btn modal__btn--fit-width"
                tabIndex={0}
              >
                <Link
                  style={{color: 'white'}}
                  tabIndex={-1}
                  to={'/basket'}
                >
                  Перейти в корзину
                </Link>
              </button>
            </div>
            <button
              onClick={() => dispatch(setAddItemSuccessModalViewStatus(false))}
              className="cross-btn"
              type="button"
              aria-label="Закрыть попап"
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

export default AddProductSuccessModal;
