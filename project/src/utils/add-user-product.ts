import { Product } from '../types/products';
import { UserProduct, UserProducts } from '../types/user-products';

type addUserProductsProps = {
    userProducts: UserProducts;
    product: Product;
}

export const addUserProduct = ({userProducts, product}: addUserProductsProps): UserProducts => {
  const changedUserProducts = [] as UserProducts;
  for (const item of userProducts) {
    const userProduct: UserProduct = {...item};
    if(item.product.id === product.id) {
      userProduct.selectedQuantity += 1;
      changedUserProducts.push(userProduct);
    } else {
      changedUserProducts.push(userProduct);
    }
  }
  if(!userProducts.find((item) => item.product.id === product.id)) {
    changedUserProducts.push({selectedQuantity: 1, product: product});
  }

  return changedUserProducts;
};
