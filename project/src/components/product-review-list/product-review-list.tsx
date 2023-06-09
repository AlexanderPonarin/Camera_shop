import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { Product } from '../../types/products';
import { useSelector } from 'react-redux';
import { getActiveProductVenderCode, getReviews } from '../../store/product-data/selectros';
import { fetchReviewsAction } from '../../store/api-action';
import { setActiveProductVenderCode } from '../../store/product-data/product-data';
import ProductReview from '../product-review/product-review';
import ReviewModal from '../modals/review-modal';
import { getReviewModalStatus, getReviewModalSuccessStatus } from '../../store/modal-view-process/selectors';
import { setReviewModalViewStatus } from '../../store/modal-view-process/modal-view-process';
import ReviewModalSuccess from '../modals/review-modal-success';

type ProductReviewListProps = {
  product: Product;
};

function ProductReviewList({ product }: ProductReviewListProps): JSX.Element {
  const dispatch = useAppDispatch();
  const activeVenderCode = useSelector(getActiveProductVenderCode);
  const reviews = useSelector(getReviews);
  const [visibleReviews, setVisibleReviews] = useState(3);
  const reviewModalViewStatus = useAppSelector(getReviewModalStatus);
  const reviewModalSuccessStatus = useAppSelector(getReviewModalSuccessStatus);
  const sortedReviews = [...reviews].sort((a, b) => new Date(b.createAt).getTime() - new Date(a.createAt).getTime());

  useEffect(() => {
    if (activeVenderCode !== product.vendorCode) {
      dispatch(fetchReviewsAction(product.id));
      dispatch(setActiveProductVenderCode(product.vendorCode));
    }
  }, [activeVenderCode, dispatch, product.id, product.vendorCode]);

  const handleShowMoreReviews = () => {
    setVisibleReviews(visibleReviews + 3);
  };

  const handleCloseReviewModal = () => {
    dispatch(setReviewModalViewStatus(false));
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
        {visibleReviews < reviews.length && (
          <div className="review-block__buttons">
            <button className="btn btn--purple" type="button" onClick={handleShowMoreReviews}>
              Показать больше отзывов
            </button>
          </div>
        )}
      </div>
      {reviewModalViewStatus && <ReviewModal product={product} onCloseModalBtnClick={handleCloseReviewModal}/>}
      {reviewModalSuccessStatus && <ReviewModalSuccess />}
    </section>
  );
}

export default ProductReviewList;
