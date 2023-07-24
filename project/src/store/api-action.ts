import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { AppDispatch, State } from '../types/state';
import { Products } from '../types/products';
import { PromoProduct } from '../types/promo-product';
import { Reviews } from '../types/reviews';
import { ReviewForm } from '../types/review-form';
import { setItemBasketSuccessModalViewStatus, setReviewModalSuccessViewStatus, setReviewModalViewStatus } from './modal-view-process/modal-view-process';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DataReviesList } from '../types/data-reviews-list';
import { PromoCode } from '../types/promoCode';
import { setCouponBonus, setInvalidCouponStatus, setUserProducts, setValidCouponStatus } from './user-process/user-process';
import { UserOrder } from '../types/user-order';
import { redirectToRoute } from './actions';

export const fetchProductsAction = createAsyncThunk<Products, undefined, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>(
    'data/fetchProducts',
    async (_arg, { extra: api}) => {
      try {
        const {data} = await api.get<Products>('cameras');
        return data;
      } catch(e) {
        return [];
      }
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

export const fetchSimilarProductsAction = createAsyncThunk<Products, number, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>(
    'data/fetchSimilarProducts',
    async ( id, {dispatch, extra: api}) => {
      const {data} = await api.get<Products>(`/cameras/${id}/similar`);
      return data;
    },
  );

export const fetchReviewsAction = createAsyncThunk<DataReviesList, number, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>(
    'data/fetchReviews',
    async ( id, {dispatch, extra: api}) => {
      const {data} = await api.get<Reviews>(`/cameras/${id}/reviews`);
      return {[id]: data};
    },
  );

export const sendReviewAction = createAsyncThunk<void, ReviewForm, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>(
    'comments/sendReview',
    async (userReview, {dispatch, extra: api}) => {
      try {
        await api.post<ReviewForm>('reviews', userReview);
        dispatch(fetchReviewsAction(userReview.cameraId));
        dispatch(setReviewModalViewStatus(false));
        dispatch(setReviewModalSuccessViewStatus(true));
      } catch(error) {
        toast.warn('Не удалось отправить отзыв');
      }
    },
  );

export const sendPromoCodeAction = createAsyncThunk<number, PromoCode, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>(
    'user/promocode',
    async ( code, {dispatch, extra: api}) => {
      try {
        const { data } = await api.post<number>('/coupons', code);
        dispatch(setInvalidCouponStatus(false));
        dispatch(setValidCouponStatus(true));
        return data;
      } catch(error) {
        dispatch(setValidCouponStatus(false));
        dispatch(setInvalidCouponStatus(true));
        throw error;
      }
    });

export const sendOrderAction = createAsyncThunk<void, UserOrder, {
      dispatch: AppDispatch;
      state: State;
      extra: AxiosInstance;
    }>(
      'data/order',
      async ( order, {dispatch, extra: api}) => {
        try {
          await api.post<string>('/orders', order);
          dispatch(setItemBasketSuccessModalViewStatus(true));
          dispatch(setUserProducts([]));
          dispatch(setCouponBonus(0));
          dispatch(setValidCouponStatus(false));
          dispatch(setInvalidCouponStatus(false));
        } catch(e) {
          dispatch(redirectToRoute('/failorder'));
        }
      });
