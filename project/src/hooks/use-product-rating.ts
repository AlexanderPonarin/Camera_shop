import { useEffect, useRef } from 'react';
import { useAppDispatch } from '.';
import { fetchReviewsAction } from '../store/api-action';
import { useSelector } from 'react-redux';
import { getActiveProductVenderCode, getReviews } from '../store/product-data/selectros';
import { Product } from '../types/products';
import { setActiveProductVenderCode } from '../store/product-data/product-data';


function useProductRating(product: Product): number {
  const dispatch = useAppDispatch();
  const reviews = useSelector(getReviews);
  const ProductRatingRef = useRef(0);
  const acvc = useSelector(getActiveProductVenderCode);


  useEffect(() => {
    if(product.vendorCode !== acvc) {
      dispatch(fetchReviewsAction(product.id));
      dispatch(setActiveProductVenderCode(product.vendorCode));

      ProductRatingRef.current = Math.ceil(
        reviews.map((item) => item.rating)
          .reduce((acc, number) => acc + number, 0) / reviews.length
      );
    }
  }, []);
  return ProductRatingRef.current;
}

export default useProductRating;
