import { Review } from '../../types/reviews';
import { createReviewDate } from '../../utils/formate-review-date';

type ProductReviewProps = {
    review: Review;
}

function ProductReview({review}: ProductReviewProps): JSX.Element {

  return (
    <li className="review-card">
      <div className="review-card__head">
        <p className="title title--h4">{review.userName}</p>
        <time className="review-card__data" dateTime="2022-04-13">{createReviewDate(review.createAt)}</time>
      </div>
      <div className="rate review-card__rate">
        <svg width="17" height="16" aria-hidden="true">
          <use xlinkHref={`#icon-${review.rating >= 1 ? 'full-star' : 'star' }`}></use>
        </svg>
        <svg width="17" height="16" aria-hidden="true">
          <use xlinkHref={`#icon-${review.rating >= 2 ? 'full-star' : 'star' }`}></use>
        </svg>
        <svg width="17" height="16" aria-hidden="true">
          <use xlinkHref={`#icon-${review.rating >= 3 ? 'full-star' : 'star' }`}></use>
        </svg>
        <svg width="17" height="16" aria-hidden="true">
          <use xlinkHref={`#icon-${review.rating >= 4 ? 'full-star' : 'star' }`}></use>
        </svg>
        <svg width="17" height="16" aria-hidden="true">
          <use xlinkHref={`#icon-${review.rating === 5 ? 'full-star' : 'star' }`}></use>
        </svg>
        <p className="visually-hidden">Оценка: {review.rating}</p>
      </div>
      <ul className="review-card__list">
        <li className="item-list"><span className="item-list__title">Достоинства:</span>
          <p className="item-list__text">{review.advantage}</p>
        </li>
        <li className="item-list"><span className="item-list__title">Недостатки:</span>
          <p className="item-list__text">{review.disadvantage}</p>
        </li>
        <li className="item-list"><span className="item-list__title">Комментарий:</span>
          <p className="item-list__text">{review.review}</p>
        </li>
      </ul>
    </li>
  );
}

export default ProductReview;
