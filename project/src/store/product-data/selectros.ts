import { NameSpace } from '../../consts';
import { Products } from '../../types/products';
import { PromoProduct } from '../../types/promo-product';
import { State } from '../../types/state';

export const getProducts = ( state: State): Products => state[NameSpace.Data].products;
export const getPromoProduct = ( state: State): PromoProduct => state[NameSpace.Data].promoProduct;
export const getSimilarProducts = ( state: State): Products => state[NameSpace.Data].similarProducts;
export const getQuestionsDataLoadingStatus = (state: State): boolean => state[NameSpace.Data].isQuestionsDataLoading;
