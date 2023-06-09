import {store} from '../store/index';
import { Products } from './products';
import { PromoProduct } from './promo-product';
import { Reviews } from './reviews';

export type ProductDataProcess = {
  products: Products ;
  promoProduct: PromoProduct;
  similarProducts: Products;
  isProductsDataLoading: boolean;
  activeProductVenderCode: string;
  reviews: Reviews;
}

export type ModalViewProcess = {
  reviewModalViewStatus: boolean;
  reviewModalSuccessViewStatus: boolean;
  addItemModalViewStatus: boolean;
}

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
