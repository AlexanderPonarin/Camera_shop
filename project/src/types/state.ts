import {store} from '../store/index';
import { DataReviesList } from './data-reviews-list';
import { Products } from './products';
import { PromoProduct } from './promo-product';

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
}

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
