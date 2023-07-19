import { Product } from '../types/products';
import { UserProducts } from '../types/user-products';

type removeUserProductProps = {
    userProducts: UserProducts;
    product: Product;
}

export const removeUserProduct = ({userProducts, product}: removeUserProductProps): UserProducts => {
  const changedUserProducts = [...userProducts].filter((item) => item.product.id !== product.id);

  return changedUserProducts;
};
