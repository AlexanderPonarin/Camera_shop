import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../consts';
import { ProductDataProcess } from '../../types/state';
import { fetchProductsAction, fetchPromoProductAction, fetchReviewsAction, fetchSimilarProductsAction } from '../api-action';
import { PromoProduct } from '../../types/promo-product';
import { DataReviesList } from '../../types/data-reviews-list';
import { Products } from '../../types/products';

const initialState: ProductDataProcess = {
  products: [] as Products,
  promoProduct: {} as PromoProduct,
  similarProducts: [],
  isProductsDataLoading: false,
  activeProductVenderCode: '',
  reviews: {} as DataReviesList,
};

export const ProductData = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {
    setActiveProductVenderCode: (state, action: PayloadAction<string>) => {
      state.activeProductVenderCode = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProductsAction.pending, (state) => {
        state.isProductsDataLoading = true;
      });
    builder
      .addCase(fetchProductsAction.fulfilled, (state, action) => {
        state.products = action.payload;
        state.isProductsDataLoading = false;
      });
    builder
      .addCase(fetchPromoProductAction.pending, (state) => {
        state.isProductsDataLoading = true;
      });
    builder
      .addCase(fetchPromoProductAction.fulfilled, (state, action) => {
        state.promoProduct = action.payload;
        state.isProductsDataLoading = false;
      });
    builder
      .addCase(fetchSimilarProductsAction.pending, (state) => {
        state.isProductsDataLoading = true;
      });
    builder
      .addCase(fetchSimilarProductsAction.fulfilled, (state, action) => {
        state.similarProducts = action.payload;
        state.isProductsDataLoading = false;
      });
    builder
      .addCase(fetchReviewsAction.pending, (state) => {
        state.isProductsDataLoading = true;
      });
    builder
      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        state.reviews = {...state.reviews, ...action.payload};
        state.isProductsDataLoading = false;
      });

  }
});

export const {setActiveProductVenderCode} = ProductData.actions;
