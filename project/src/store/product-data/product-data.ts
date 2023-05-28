import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../consts';
import { ProductDataProcess } from '../../types/state';
import { fetchProductsAction, fetchPromoProductAction, fetchSimilarProductsAction } from '../api-action';
import { PromoProduct } from '../../types/promo-product';

const initialState: ProductDataProcess = {
  products: [],
  promoProduct: {} as PromoProduct,
  similarProducts: [],
  isQuestionsDataLoading: false,
};

export const ProductData = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchProductsAction.pending, (state) => {
        state.isQuestionsDataLoading = true;
      });

    builder
      .addCase(fetchProductsAction.fulfilled, (state, action) => {
        state.products = action.payload;
        state.isQuestionsDataLoading = false;
      });
    builder
      .addCase(fetchPromoProductAction.pending, (state) => {
        state.isQuestionsDataLoading = true;
      });
    builder
      .addCase(fetchPromoProductAction.fulfilled, (state, action) => {
        state.promoProduct = action.payload;
        state.isQuestionsDataLoading = false;
      });
    builder
      .addCase(fetchSimilarProductsAction.pending, (state) => {
        state.isQuestionsDataLoading = true;
      });
    builder
      .addCase(fetchSimilarProductsAction.fulfilled, (state, action) => {
        state.similarProducts = action.payload;
        state.isQuestionsDataLoading = false;
      });

  }
});
