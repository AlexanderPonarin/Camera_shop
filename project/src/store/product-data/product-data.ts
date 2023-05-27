import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../consts';
import { ProductDataProcess } from '../../types/state';
import { fetchProductsAction, fetchPromoProductAction } from '../api-action';
import { PromoProduct } from '../../types/promo-product';

const initialState: ProductDataProcess = {
  products: [],
  promoProduct: {} as PromoProduct,
};

export const ProductData = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchProductsAction.fulfilled, (state, action) => {
        state.products = action.payload;
      });
    builder
      .addCase(fetchPromoProductAction.fulfilled, (state, action) => {
        state.promoProduct = action.payload;
      });
  }
});
