import {store} from '../store/index';
import { Products } from './products';
import { PromoProduct } from './promo-product';

export type ProductDataProcess = {
  products: Products ;
  promoProduct: PromoProduct;
}


export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
