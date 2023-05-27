import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { AppDispatch, State } from '../types/state';
import { Products } from '../types/products';
import { PromoProduct } from '../types/promo-product';

export const fetchProductsAction = createAsyncThunk<Products, undefined, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>(
    'data/fetchProducts',
    async (_arg, {dispatch, extra: api}) => {
      const {data} = await api.get<Products>('cameras');
      return data;
    },
  );

export const fetchPromoProductAction = createAsyncThunk<PromoProduct, undefined, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>(
    'data/fetchPromoProduct',
    async (_arg, {dispatch, extra: api}) => {
      const {data} = await api.get<PromoProduct>('promo');
      return data;
    },
  );
