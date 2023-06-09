import { NameSpace } from '../../consts';
import { Products } from '../../types/products';
import { PromoProduct } from '../../types/promo-product';
import { Reviews } from '../../types/reviews';
import { State } from '../../types/state';

export const getProducts = ( state: State): Products => state[NameSpace.Data].products;
export const getPromoProduct = ( state: State): PromoProduct => state[NameSpace.Data].promoProduct;
export const getSimilarProducts = ( state: State): Products => state[NameSpace.Data].similarProducts;
export const getQuestionsDataLoadingStatus = (state: State): boolean => state[NameSpace.Data].isProductsDataLoading;
export const getActiveProductVenderCode = (state: State): string => state[NameSpace.Data].activeProductVenderCode;
export const getReviews = (state: State): Reviews => state[NameSpace.Data].reviews;
