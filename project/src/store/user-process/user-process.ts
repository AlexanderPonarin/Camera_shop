import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../consts';
import { UserProcess } from '../../types/state';
import { UserProducts } from '../../types/user-products';

const initialState: UserProcess = {
  products: [] as UserProducts,
};

export const User = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {
    setUserProducts: (state, action: PayloadAction<UserProducts>) => {
      state.products = action.payload;
    },
  },
});

export const { setUserProducts } = User.actions;
