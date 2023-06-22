import { useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { getReviewModalSuccessStatus } from '../../../store/modal-view-process/selectors';
import useScrollLock from '../../../hooks/use-scroll-lock';
import { setReviewModalSuccessViewStatus } from '../../../store/modal-view-process/modal-view-process';


function ReviewModalSuccess(): JSX.Element {
  const dispatch = useAppDispatch();
  const modalRef = useRef<HTMLDivElement>(null);
  const reviewModalSuccessStatus = useAppSelector(getReviewModalSuccessStatus);


  useScrollLock();
  useModalKeyboardEvents({ modalRef });
  return (
    <div
      data-testid="review-modal-success"
      onClick={() => dispatch(setReviewModalSuccessViewStatus(false))}
      className={reviewModalSuccessStatus ? 'modal is-active modal--narrow' : 'modal'}
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
              onClick={ () => dispatch(setReviewModalSuccessViewStatus(false))}
              className="btn btn--purple modal__btn modal__btn--fit-width" type="button"
            >Вернуться к покупкам
            </button>
          </div>
          <button
            onClick={ () => dispatch(setReviewModalSuccessViewStatus(false))}
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
function useModalKeyboardEvents(arg0: { modalRef: import('react').RefObject<HTMLDivElement> }) {
  throw new Error('Function not implemented.');
}

