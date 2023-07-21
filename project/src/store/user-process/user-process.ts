import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../consts';
import { UserProcess } from '../../types/state';
import { UserProducts } from '../../types/user-products';

const initialState: UserProcess = {
  products: [] as UserProducts,
  couponBonus: 0,
  validCouponStatus: false,
  invalidCouponStatus: false
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
});

export const { setUserProducts, setCouponBonus, setValidCouponStatus, setInvalidCouponStatus } = User.actions;
