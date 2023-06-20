import { FieldError, useForm } from 'react-hook-form';
import { ReviewForm } from '../../types/review-form';
import { ChangeEvent, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { sendReviewAction } from '../../store/api-action';
import { Product } from '../../types/products';
import { useModalKeyboardEvents } from '../../hooks/use-modal-keyboard-events';
import useScrollLock from '../../hooks/use-scroll-lock';
import { setReviewModalViewStatus } from '../../store/modal-view-process/modal-view-process';
import { getReviewModalStatus } from '../../store/modal-view-process/selectors';

type ReviewModalProps = {
    product: Product;
}

function ReviewModal({product}: ReviewModalProps): JSX.Element {
  const { register, formState: { errors }, handleSubmit} = useForm<ReviewForm>();
  const [ratingValue, setRatingValue] = useState(0);
  const [isDefaultInput, setIsDefaultInput] = useState(true);
  const dispatch = useAppDispatch();
  const modalRef = useRef<HTMLDivElement>(null);
  const reviewModalStatus = useAppSelector(getReviewModalStatus);


  useScrollLock();
  useModalKeyboardEvents({ modalRef });

  const onSubmit = (data: ReviewForm) => {
    if (product.id) {
      data.cameraId = product.id;
      data.rating = ratingValue;
      dispatch(sendReviewAction(data));
    }
  };


  const onChangeInputColorHandler = (status: boolean, error: FieldError | undefined, isTextaria?: boolean) => {
    if (status) {
      return isTextaria ? 'custom-textarea form-review__item' : 'custom-input form-review__item';
    }
    if (error) {
      return isTextaria ? 'custom-textarea form-review__item is-invalid' : 'custom-input form-review__item is-invalid ';
    }
    if (!error) {
      return isTextaria ? 'custom-textarea form-review__item is-valid' : 'custom-input form-review__item is-valid';
    }
  };

  return (
    <div
      onClick={() => dispatch(setReviewModalViewStatus(false))}
      className={reviewModalStatus ? 'modal is-active' : 'modal'}
    >
      <div className="modal__wrapper">
        <div className="modal__overlay"></div>
        <div
          ref={modalRef}
          onClick={(evt) => evt.stopPropagation()}
          className="modal__content"
        >
          <p className="title title--h4">Оставить отзыв</p>
          <div className="form-review">
            <form
              onSubmit={(event) =>
                void handleSubmit(onSubmit)(event)}
              method="post"
            >
              <div className="form-review__rate">
                <fieldset className="rate form-review__item">
                  <legend className="rate__caption">Рейтинг
                    <svg width="9" height="9" aria-hidden="true">
                      <use xlinkHref="#icon-snowflake"></use>
                    </svg>
                    {errors.rating?.message && <p className="custom-input__error">{errors.rating?.message}</p>}
                  </legend>

                  <div
                    className="rate__bar"

                  >
                    <div
                      onChange={(evt: ChangeEvent<HTMLInputElement>) =>
                        setRatingValue(Number(evt.target.value))}
                      className="rate__group"
                    >
                      <input
                        {...register('rating', {
                          value: 0,
                          required: {
                            value: true,
                            message: 'Нужно оценить товар',
                          },
                          min: 1,
                          max: 5
                        })}
                        className="visually-hidden" id="star-5" name="rating" type="radio" value="5"
                      />
                      <label className="rate__label" htmlFor="star-5" title="Отлично"></label>
                      <input
                        {...register('rating')}
                        className="visually-hidden" id="star-4" name="rating" type="radio" value="4"
                      />
                      <label className="rate__label" htmlFor="star-4" title="Хорошо"></label>
                      <input
                        {...register('rating')}
                        className="visually-hidden" id="star-3" name="rating" type="radio" value="3"
                      />
                      <label className="rate__label" htmlFor="star-3" title="Нормально"></label>
                      <input
                        {...register('rating')}
                        className="visually-hidden" id="star-2" name="rating" type="radio" value="2"
                      />
                      <label className="rate__label" htmlFor="star-2" title="Плохо"></label>
                      <input
                        {...register('rating')}
                        className="visually-hidden" id="star-1" name="rating" type="radio" value="1"
                      />
                      <label className="rate__label" htmlFor="star-1" title="Ужасно"></label>
                    </div>
                    <div className="rate__progress">
                      <span className="rate__stars">{ratingValue}</span>
                      <span>/</span> <span className="rate__all-stars">5</span>
                    </div>
                  </div>
                </fieldset>
              </div>
              <div
                className={onChangeInputColorHandler(isDefaultInput, errors.userName)}
              >
                <label>
                  <span className="custom-input__label">Ваше имя
                    <svg width="9" height="9" aria-hidden="true">
                      <use xlinkHref="#icon-snowflake"></use>
                    </svg>
                  </span>
                  <input
                    {...register('userName', {
                      required:{
                        value: true,
                        message: 'Введите имя'
                      },
                      maxLength: {
                        value: 20,
                        message: 'Максимальное количество символов 25'
                      },
                      minLength:
                      {value: 4,
                        message: 'Имя должно быть не менее 4 символов'}
                    },
                    )}
                    aria-invalid={errors.userName ? 'true' : 'false'}
                    type="text" name="userName" placeholder="Введите ваше имя" id="userName"
                  />
                </label>
                {errors.userName?.message ? <p className="custom-input__error">{errors.userName?.message}</p> : ''}
              </div>
              <div
                className={onChangeInputColorHandler(isDefaultInput, errors.advantage)}
              >
                <label>
                  <span className="custom-input__label">Достоинства
                    <svg width="9" height="9" aria-hidden="true">
                      <use xlinkHref="#icon-snowflake"></use>
                    </svg>
                  </span>
                  <input
                    {...register('advantage', {
                      required:{
                        value: true,
                        message: 'Нужно указать достоинства'
                      },
                      maxLength: {
                        value: 300,
                        message: 'Максимальное количество символов 300'
                      },
                      minLength:{
                        value: 5,
                        message: 'Имя должно быть не менее 5 символов'}
                    },
                    )}
                    aria-invalid={errors.advantage ? 'true' : 'false'}
                    type="text" name="advantage" placeholder="Основные преимущества товара"
                  />
                </label>
                {errors.advantage && <p className="custom-input__error">{errors.advantage.message}</p>}
              </div>
              <div
                className={onChangeInputColorHandler(isDefaultInput, errors.disadvantage)}
              >
                <label>
                  <span className="custom-input__label">Недостатки
                    <svg width="9" height="9" aria-hidden="true">
                      <use xlinkHref="#icon-snowflake"></use>
                    </svg>
                  </span>
                  {errors.disadvantage && <p className="custom-input__error">{errors.disadvantage.message}</p>}
                  <input
                    {...register('disadvantage', {
                      required:{
                        value: true,
                        message: 'Нужно указать недостатки'
                      },
                      maxLength: {
                        value: 300,
                        message: 'Максимальное количество символов 300'
                      },
                      minLength:{
                        value: 5,
                        message: 'Имя должно быть не менее 5 символов'}
                    },
                    )}
                    aria-invalid={errors.disadvantage ? 'true' : 'false'}
                    type="text" name="disadvantage" placeholder="Главные недостатки товара"
                  />
                </label>
              </div>
              <div
                className={onChangeInputColorHandler(isDefaultInput, errors.review, true)}
              >
                <label>
                  <span className="custom-textarea__label">Комментарий
                    <svg width="9" height="9" aria-hidden="true">
                      <use xlinkHref="#icon-snowflake"></use>
                    </svg>
                  </span>
                  {errors.disadvantage && <p className="custom-input__error">{errors.review?.message}</p>}
                  <textarea
                    {...register('review', {
                      required:{
                        value: true,
                        message: 'Нужно добавить комментарий'
                      },
                      maxLength: {
                        value: 1000,
                        message: 'Максимальное количество символов 1000'
                      },
                      minLength:{
                        value: 5,
                        message: 'Имя должно быть не менее 5 символов'}
                    },
                    )}
                    name="review" placeholder="Поделитесь своим опытом покупки"
                  >
                  </textarea>
                </label>
              </div>
              <button
                onClick={() => setIsDefaultInput(false)}
                className="btn btn--purple form-review__btn" type="submit"
              >Отправить отзыв
              </button>
            </form>
          </div>
          <button
            onClick={() => dispatch(setReviewModalViewStatus(false))}
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

export default ReviewModal;
