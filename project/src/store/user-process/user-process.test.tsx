import { configureStore } from '@reduxjs/toolkit';
import { User } from './user-process';
import { UserProducts } from '../../types/user-products';
import { sendOrderAction, sendPromoCodeAction, sendReviewAction } from '../api-action';
import { UserProcess } from '../../types/state';

const store = configureStore({
  reducer: {
    user: User.reducer
  }
});

const initialState: UserProcess = {
  products: [] as UserProducts,
  couponBonus: 0,
  validCouponStatus: false,
  invalidCouponStatus: false,
  isUserProcessLoading: false
};

describe('User slice', () => {
  beforeEach(() => {
    store.dispatch(User.actions.setUserProducts([]));
    store.dispatch(User.actions.setCouponBonus(0));
    store.dispatch(User.actions.setValidCouponStatus(false));
    store.dispatch(User.actions.setInvalidCouponStatus(false));
  });

  it('should set the user products correctly', () => {
    const userProducts = [
      { selectedQuantity: 1,
        product:
          { id: 1, name: 'Product 1' }}
    ] as unknown as UserProducts ;
    store.dispatch(User.actions.setUserProducts(userProducts));

    const state = store.getState().user;
    expect(state.products).toEqual(userProducts);
  });

  it('should set the coupon bonus correctly', () => {
    const couponBonus = 10;
    store.dispatch(User.actions.setCouponBonus(couponBonus));

    const state = store.getState().user;
    expect(state.couponBonus).toEqual(couponBonus);
  });

  it('should set the valid coupon status correctly', () => {
    const validCouponStatus = true;
    store.dispatch(User.actions.setValidCouponStatus(validCouponStatus));

    const state = store.getState().user;
    expect(state.validCouponStatus).toEqual(validCouponStatus);
  });

  it('should set the invalid coupon status correctly', () => {
    const invalidCouponStatus = true;
    store.dispatch(User.actions.setInvalidCouponStatus(invalidCouponStatus));

    const state = store.getState().user;
    expect(state.invalidCouponStatus).toEqual(invalidCouponStatus);
  });

  it('should set the user process loading state to true on sendOrderAction.pending', () => {
    const action = sendOrderAction.pending;
    const newState = User.reducer(initialState, action);
    expect(newState.isUserProcessLoading).toBe(true);
  });

  it('should set the user process loading state to false on sendOrderAction.fulfilled', () => {
    const action = sendOrderAction.fulfilled;
    const newState = User.reducer(initialState, action);
    expect(newState.isUserProcessLoading).toBe(false);
  });

  it('should set the user process loading state to true on sendPromoCodeAction.pending', () => {
    const action = sendPromoCodeAction.pending;
    const newState = User.reducer(initialState, action);
    expect(newState.isUserProcessLoading).toBe(true);
  });

  it('should set the coupon bonus correctly and the user process loading state to false on sendPromoCodeAction.fulfilled', () => {
    const action = sendPromoCodeAction.fulfilled;
    const newState = User.reducer(initialState, action);
    expect(newState.isUserProcessLoading).toBe(false);
  });

  it('should set the user process loading state to false on sendPromoCodeAction.rejected', () => {
    const action = sendPromoCodeAction.rejected;
    const newState = User.reducer(initialState, action);
    expect(newState.isUserProcessLoading).toBe(false);
  });

  it('should set the user process loading state to true on sendReviewAction.pending', () => {
    const action = sendReviewAction.pending;
    const newState = User.reducer(initialState, action);
    expect(newState.isUserProcessLoading).toBe(true);
  });

  it('should set the user process loading state to false on sendReviewAction.fulfilled', () => {
    const action = sendReviewAction.fulfilled;
    const newState = User.reducer(initialState, action);
    expect(newState.isUserProcessLoading).toBe(false);
  });
});
