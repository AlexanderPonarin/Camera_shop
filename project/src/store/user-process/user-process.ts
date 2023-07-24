import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../consts';
import { UserProcess } from '../../types/state';
import { UserProducts } from '../../types/user-products';
import { sendOrderAction, sendPromoCodeAction, sendReviewAction } from '../api-action';

const initialState: UserProcess = {
  products: [] as UserProducts,
  couponBonus: 0,
  validCouponStatus: false,
  invalidCouponStatus: false,
  isUserProcessLoading: false
};

export const User = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {
    setUserProducts: (state, action: PayloadAction<UserProducts>) => {
      state.products = action.payload;
    },
    setCouponBonus: (state, action: PayloadAction<number>) => {
      state.couponBonus = action.payload;
    },
    setValidCouponStatus: (state, action: PayloadAction<boolean>) => {
      state.validCouponStatus = action.payload;
    },
    setInvalidCouponStatus: (state, action: PayloadAction<boolean>) => {
      state.invalidCouponStatus = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(sendOrderAction.pending, (state) => {
        state.isUserProcessLoading = true;
      });
    builder
      .addCase(sendOrderAction.fulfilled, (state) => {
        state.isUserProcessLoading = false;
      });
    builder
      .addCase(sendPromoCodeAction.pending , (state) => {
        state.isUserProcessLoading = true;
      });
    builder
      .addCase(sendPromoCodeAction.fulfilled, (state, action) => {
        state.couponBonus = action.payload;
        state.isUserProcessLoading = false;
      });
    builder
      .addCase(sendPromoCodeAction.rejected, (state) => {
        state.isUserProcessLoading = false;
      });
    builder
      .addCase(sendReviewAction.pending , (state) => {
        state.isUserProcessLoading = true;
      });
    builder
      .addCase(sendReviewAction.fulfilled, (state) => {
        state.isUserProcessLoading = false;
      });
  }});

export const { setUserProducts, setCouponBonus, setValidCouponStatus, setInvalidCouponStatus } = User.actions;
