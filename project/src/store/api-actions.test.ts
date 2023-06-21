import { AxiosInstance } from 'axios';
import { fetchProductsAction, fetchPromoProductAction, fetchSimilarProductsAction, fetchReviewsAction, sendReviewAction } from './api-action';
import { configureMockStore } from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import { createAPI } from '../services/api';
import thunk, {ThunkDispatch} from 'redux-thunk';
import { State } from '../types/state';
import {Action} from 'redux';
import { Product, Products } from '../types/products';
import { PromoProduct } from '../types/promo-product';
import { Review, Reviews } from '../types/reviews';
import { ReviewForm } from '../types/review-form';

const mockReviews: Reviews = [{
  id: '1',
  review: 'KEKS'
},
{
  id: '2',
  review: 'NOT KEKS'
}] as Reviews;

const mockUserReview: ReviewForm = {
  cameraId: 1,
  userName: 'Keks',
  advantage: 'Лежит в лапах хорошо',
  disadvantage: 'Упал - дорого чинить. Месяц без еды',
  review: 'Круто фоткать со шкафа',
  rating: 6,
} as ReviewForm;

const mockProducts: Products = [
  {
    id: 1,
    name: 'Product 1',
    price: 10.5,
  },
  {
    id: 2,
    name: 'Product 2',
    price: 5.99,
  },
  {
    id: 3,
    name: 'Product 3',
    price: 15.75,
  }
] as Products;

const mockPromoProduct: PromoProduct = {
  id: 1,
  name: 'promo product'
} as PromoProduct;

const api = createAPI();
const mockApi = new MockAdapter(api);
const middlewares = [thunk.withExtraArgument(api)];

const mockStore = configureMockStore<
  State,
  Action<string>,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

describe('api-action', () => {
  it('should set products to store when GET /cameras', async () => {
    const store = mockStore();
    mockApi.onGet('cameras').reply(200, mockProducts);
    expect(store.getActions()).toEqual([]);
    await store.dispatch(fetchProductsAction());
    const actions = store.getActions().map(({ type }) => type);
    expect(actions).toEqual([
      fetchProductsAction.pending.type,
      fetchProductsAction.fulfilled.type,
    ]);
  });
  it('should set similar products to store when GET /cameras/id/similar', async () => {
    const store = mockStore();
    const id = 3;
    mockApi.onGet(`/cameras/${id}/similar`).reply(200, mockProducts);
    expect(store.getActions()).toEqual([]);
    await store.dispatch(fetchSimilarProductsAction(id));
    const actions = store.getActions().map(({ type }) => type);
    expect(actions).toEqual([
      fetchSimilarProductsAction.pending.type,
      fetchSimilarProductsAction.fulfilled.type,
    ]);
  });

  it('should set promo product', async () => {
    const store = mockStore();
    mockApi.onGet('promo').reply(200, mockPromoProduct);
    expect(store.getActions()).toEqual([]);
    await store.dispatch(fetchPromoProductAction());
    const actions = store.getActions().map(({ type }) => type);
    expect(actions).toEqual([
      fetchPromoProductAction.pending.type,
      fetchPromoProductAction.fulfilled.type,
    ]);
  });
  it('should set reviews to payload when GET /cameras/1/reviews', async () => {
    const store = mockStore();
    const id = 1;
    mockApi
      .onGet(`/cameras/${id}/reviews`)
      .reply(200, mockReviews);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchReviewsAction(1));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      fetchReviewsAction.pending.type,
      fetchReviewsAction.fulfilled.type,
    ]);
  });

  it('should get reviews when POST /cameras/id/reviews', async () => {
    const store = mockStore();
    const id = 1;
    mockApi
      .onPost(`/cameras/${id}/reviews`)
      .reply(200, mockReviews);
    expect(store.getActions()).toEqual([]);

    await store.dispatch(sendReviewAction(mockUserReview));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      sendReviewAction.pending.type,
      sendReviewAction.fulfilled.type,
    ]);
  });
});

