import { sortOrder, sortType } from '../consts';
import { Products } from '../types/products';
import { Reviews } from '../types/reviews';
import { getProductRating } from './get-product-rating';

type sortProductsProps = {
  products: Products;
  reviews: {[key: number]: Reviews};
  type: string | null;
  order: string | null;
}

export function sortProducts({products, reviews, type, order}: sortProductsProps) {
  const sortedProducts = [];

  if(reviews) {
    for(const item of products) {
      const productItem = {...item};
      productItem.rating = getProductRating(reviews[item.id]);
      sortedProducts.push(productItem);
    }
  }

  if (type === sortType.Price) {
    sortedProducts.sort((a, b) => a.price - b.price);
    if (order === sortOrder.Up) {
      return sortedProducts.sort((a, b) => a.price - b.price);
    } else if (order === sortOrder.Down) {
      return sortedProducts.sort((a, b) => b.price - a.price);
    }
  } else if (type === sortType.Popular) {
    sortedProducts.sort((a, b) => a.rating - b.rating);
    if (order === sortOrder.Up) {
      return sortedProducts.sort((a, b) => a.rating - b.rating);
    } else if (order === sortOrder.Down) {
      return sortedProducts.sort((a, b) => b.rating - a.rating);
    }
  }

  return sortedProducts;
}
