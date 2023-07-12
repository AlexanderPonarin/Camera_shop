import { Reviews } from '../types/reviews';


export const getProductRating = (productReviews: Reviews): number => {

  if(productReviews){
    return Math.ceil(productReviews.map((item) => item.rating)
      .reduce((acc, number) => acc + number, 0) / productReviews.length);
  } else {
    return 0;
  }
};
