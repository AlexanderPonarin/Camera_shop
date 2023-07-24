import { NameSpace } from '../../consts';
import { State } from '../../types/state';
import { UserProducts } from '../../types/user-products';

export const getUserProducts = ( state: State): UserProducts => state[NameSpace.User].products;
export const getCouponBonus = ( state: State): number => state[NameSpace.User].couponBonus;
export const getValidCouponStatus = ( state: State): boolean => state[NameSpace.User].validCouponStatus;
export const getInvalidCouponStatus = ( state: State): boolean => state[NameSpace.User].invalidCouponStatus;
export const getUserProcessLoadingStatus = ( state: State): boolean => state[NameSpace.User].isUserProcessLoading;
