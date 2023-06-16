import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { AppDispatch, State } from '../types/state';
import { Products } from '../types/products';
import { PromoProduct } from '../types/promo-product';
import { Reviews } from '../types/reviews';
import { ReviewForm } from '../types/review-form';
import { setReviewModaSuccessViewStatus, setReviewModalViewStatus } from './modal-view-process/modal-view-process';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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

export const fetchReviewsAction = createAsyncThunk<Reviews, number, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>(
    'data/fetchReviews',
    async ( id, {dispatch, extra: api}) => {
      const {data} = await api.get<Reviews>(`/cameras/${id}/reviews`);
      return data;
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
        dispatch(setReviewModaSuccessViewStatus(true));
      } catch(error) {
        toast.warn('Не удалось отправить отзыв');

      }
    },
  );
