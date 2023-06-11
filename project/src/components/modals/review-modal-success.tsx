import { useRef } from 'react';
import { useAppDispatch } from '../../hooks';
import { useModalKeyboardEvents } from '../../hooks/use-madal-keyboard-events';
import useScrollLock from '../../hooks/use-scroll-lock';
import { setReviewModaSuccessViewStatus } from '../../store/modal-view-process/modal-view-process';

function ReviewModalSuccess(): JSX.Element {
  const dispatch = useAppDispatch();
  const modalRef = useRef<HTMLDivElement>(null);

  useScrollLock();
  useModalKeyboardEvents({ modalRef });
  return (
    <div
      onClick={() => dispatch(setReviewModaSuccessViewStatus(false))}
      className="modal is-active modal--narrow"
    >
      <div className="modal__wrapper">
        <div className="modal__overlay"></div>
        <div
          ref={modalRef}
          onClick={(evt) => evt.stopPropagation()}
          className="modal__content"
        >
          <p className="title title--h4">Спасибо за отзыв</p>
          <svg className="modal__icon" width="80" height="78" aria-hidden="true">
            <use xlinkHref="#icon-review-success"></use>
          </svg>
          <div className="modal__buttons">
            <button
              onClick={ () => dispatch(setReviewModaSuccessViewStatus(false))}
              className="btn btn--purple modal__btn modal__btn--fit-width" type="button"
            >Вернуться к покупкам
            </button>
          </div>
          <button
            onClick={ () => dispatch(setReviewModaSuccessViewStatus(false))}
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

export default ReviewModalSuccess;
