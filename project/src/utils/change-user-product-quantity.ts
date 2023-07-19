import { Product } from '../types/products';
import { UserProduct, UserProducts } from '../types/user-products';

type changeUserProductQuantityProps = {
    userProducts: UserProducts;
    product: Product;
    quantity: number;
}

export const changeUserProductQuantity = ({userProducts, product, quantity}: changeUserProductQuantityProps): UserProducts => {
  const changedUserProducts = [] as UserProducts;
  for (const item of userProducts) {
    const userProduct: UserProduct = {...item};
    if(item.product.id === product.id) {
      userProduct.selectedQuantity = quantity;
      changedUserProducts.push(userProduct);
    } else {
      changedUserProducts.push(userProduct);
    }
  }

  return changedUserProducts;
};
