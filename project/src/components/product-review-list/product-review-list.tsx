import { useState, useEffect } from 'react';
import { useAppDispatch } from '../../hooks';
import { Product } from '../../types/products';
import { useSelector } from 'react-redux';
import { getActiveProductVenderCode, getReviews } from '../../store/product-data/selectros';
import { fetchReviewsAction } from '../../store/api-action';
import { setActiveProductVenderCode } from '../../store/product-data/product-data';
import ProductReview from '../product-review/product-review';
import ReviewModal from '../modals/review-modal/review-modal';
import { setReviewModalViewStatus } from '../../store/modal-view-process/modal-view-process';
import { Reviews } from '../../types/reviews';

type ProductReviewListProps = {
  product: Product;
};

function ProductReviewList({ product }: ProductReviewListProps): JSX.Element {
  const dispatch = useAppDispatch();
  const activeVenderCode = useSelector(getActiveProductVenderCode);
  const reviews = useSelector(getReviews);
  const productReviews: Reviews = reviews[product.id] || [];
  const [visibleReviews, setVisibleReviews] = useState(3);
  const sortedReviews = Array.isArray(reviews[product.id]) ? reviews[product.id] : [];

  useEffect(() => {
    if (activeVenderCode !== product.vendorCode) {
      dispatch(fetchReviewsAction(product.id));
      dispatch(setActiveProductVenderCode(product.vendorCode));
    }
  }, [activeVenderCode, dispatch, product.id, product.vendorCode]);

  const handleShowMoreReviews = () => {
    setVisibleReviews(visibleReviews + 3);
  };

  return (
    <section className="review-block">
      <div className="container">
        <div className="page-content__headed">
          <h2 className="title title--h3">Отзывы</h2>
          <button
            onClick={() => dispatch(setReviewModalViewStatus(true))}
            className="btn" type="button"
          >
            Оставить свой отзыв
          </button>
        </div>
        <ul className="review-block__list">
          {sortedReviews
            .slice(0, visibleReviews)
            .map((item) => (
              <ProductReview key={item.id} review={item} />
            ))}
        </ul>
        {visibleReviews < productReviews.length && (
          <div className="review-block__buttons">
            <button className="btn btn--purple" type="button" onClick={handleShowMoreReviews}>
              Показать больше отзывов
            </button>
          </div>
        )}
      </div>
      <ReviewModal product={product}/>
    </section>
  );
}

export default ProductReviewList;
