import { NameSpace } from '../../consts';
import { DataReviesList } from '../../types/data-reviews-list';
import { Products } from '../../types/products';
import { PromoProduct } from '../../types/promo-product';
import { State } from '../../types/state';

export const getProducts = ( state: State): Products => state[NameSpace.Data].products;
export const getPromoProduct = ( state: State): PromoProduct => state[NameSpace.Data].promoProduct;
export const getSimilarProducts = ( state: State): Products => state[NameSpace.Data].similarProducts;
export const getDataLoadingStatus = (state: State): boolean => state[NameSpace.Data].isProductsDataLoading;
export const getActiveProductVenderCode = (state: State): string => state[NameSpace.Data].activeProductVenderCode;
export const getReviews = (state: State): DataReviesList => state[NameSpace.Data].reviews;
