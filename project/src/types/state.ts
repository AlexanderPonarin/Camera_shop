import {store} from '../store/index';
import { DataReviesList } from './data-reviews-list';
import { Products } from './products';
import { PromoProduct } from './promo-product';
import { UserProducts } from './user-products';

export type ProductDataProcess = {
  products: Products ;
  promoProduct: PromoProduct;
  similarProducts: Products;
  isProductsDataLoading: boolean;
  activeProductVenderCode: string;
  reviews: DataReviesList;
}

export type ModalViewProcess = {
  reviewModalViewStatus: boolean;
  reviewModalSuccessViewStatus: boolean;
  addItemModalViewStatus: boolean;
  addItemSuccessModalViewStatus: boolean;
  itemBasketSuccessViewStatus: boolean;
  basketRemoveItemModalViewStatus: boolean;
}

export type UserProcess = {
  products: UserProducts;
}

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
