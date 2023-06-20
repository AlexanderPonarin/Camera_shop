import {fetchProductsAction, fetchPromoProductAction, fetchReviewsAction, fetchSimilarProductsAction} from '../api-action';
import {PromoProduct} from '../../types/promo-product';
import {NameSpace} from '../../consts';
import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {ProductDataProcess} from '../../types/state';
import { ProductData } from './product-data';

describe('ProductData', () => {
  const promoProduct: PromoProduct = {
    id: 1,
    vendorCode: 'V1234',
    productName: 'Product 1',
    productPrice: 100,
  } as unknown as PromoProduct;

  const similarProducts = [
    {
      id: 2,
      vendorCode: 'V5678',
      productName: 'Product 2',
      productPrice: 200,
    },
    {
      id: 3,
      vendorCode: 'V91011',
      productName: 'Product 3',
      productPrice: 300,
    },
  ];

  const reviews = [
    {
      id: 1,
      author: 'User 1',
      reviewText: 'Good product.',
    },
    {
      id: 2,
      author: 'User 2',
      reviewText: 'Bad product.',
    },
  ];

  const initialState: ProductDataProcess = {
    products: [],
    promoProduct: {} as PromoProduct,
    similarProducts: [],
    isProductsDataLoading: false,
    activeProductVenderCode: '',
    reviews: [],
  };

  describe('Reducer', () => {
    it('should return the initial state', () => {
      expect(ProductData.reducer(undefined, {} as PayloadAction)).toEqual(initialState);
    });

    it('should handle setActiveProductVenderCode', () => {
      const activeProductVenderCode = 'V1234';
      const action = {
        type: 'DATA/setActiveProductVenderCode',
        payload: activeProductVenderCode,
      };
      const expectedState = {
        ...initialState,
        activeProductVenderCode,
      };
      expect(ProductData.reducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle fetchProductsAction.pending', () => {
      const state = {
        ...initialState,
        isProductsDataLoading: false,
      };
      const action = {type: fetchProductsAction.pending.type};
      const expectedState = {
        ...state,
        isProductsDataLoading: true,
      };
      expect(ProductData.reducer(state, action)).toEqual(expectedState);
    });

    it('should handle fetchProductsAction.fulfilled', () => {
      const state = {
        ...initialState,
        isProductsDataLoading: true,
      };
      const products = [
        {
          id: 1,
          vendorCode: 'V1234',
          productName: 'Product 1',
          productPrice: 100,
        },
        {
          id: 2,
          vendorCode: 'V5678',
          productName: 'Product 2',
          productPrice: 200,
        },
      ];
      const action = {
        type: fetchProductsAction.fulfilled.type,
        payload: products,
      };
      const expectedState = {
        ...state,
        products,
        isProductsDataLoading: false,
      };
      expect(ProductData.reducer(state, action)).toEqual(expectedState);
    });

    it('should handle fetchPromoProductAction.pending', () => {
      const state = {
        ...initialState,
        isProductsDataLoading: false,
      };
      const action = {type: fetchPromoProductAction.pending.type};
      const expectedState = {
        ...state,
        isProductsDataLoading: true,
      };
      expect(ProductData.reducer(state, action)).toEqual(expectedState);
    });

    it('should handle fetchPromoProductAction.fulfilled', () => {
      const state = {
        ...initialState,
        isProductsDataLoading: true,
      };
      const action = {
        type: fetchPromoProductAction.fulfilled.type,
        payload: promoProduct,
      };
      const expectedState = {
        ...state,
        promoProduct,
        isProductsDataLoading: false,
      };
      expect(ProductData.reducer(state, action)).toEqual(expectedState);
    });

    it('should handle fetchSimilarProductsAction.pending', () => {
      const state = {
        ...initialState,
        isProductsDataLoading: false,
      };
      const action = {type: fetchSimilarProductsAction.pending.type};
      const expectedState = {
        ...state,
        isProductsDataLoading: true,
      };
      expect(ProductData.reducer(state, action)).toEqual(expectedState);
    });

    it('should handle fetchSimilarProductsAction.fulfilled', () => {
      const state = {
        ...initialState,
        isProductsDataLoading: true,
      };
      const action = {
        type: fetchSimilarProductsAction.fulfilled.type,
        payload: similarProducts,
      };
      const expectedState = {
        ...state,
        similarProducts,
        isProductsDataLoading: false,
      };
      expect(ProductData.reducer(state, action)).toEqual(expectedState);
    });

    it('should handle fetchReviewsAction.pending', () => {
      const state = {
        ...initialState,
        isProductsDataLoading: false,
      };
      const action = {type: fetchReviewsAction.pending.type};
      const expectedState = {
        ...state,
        isProductsDataLoading: true,
      };
      expect(ProductData.reducer(state, action)).toEqual(expectedState);
    });

    it('should handle fetchReviewsAction.fulfilled', () => {
      const state = {
        ...initialState,
        isProductsDataLoading: true,
      };
      const action = {
        type: fetchReviewsAction.fulfilled.type,
        payload: reviews,
      };
      const expectedState = {
        ...state,
        reviews,
        isProductsDataLoading: false,
      };
      expect(ProductData.reducer(state, action)).toEqual(expectedState);
    });
  });

  describe('Actions', () => {
    it('should create setActiveProductVenderCode action', () => {
      const activeProductVenderCode = 'V1234';
      const expectedAction = {
        type: 'DATA/setActiveProductVenderCode',
        payload: activeProductVenderCode,
      };
      expect(ProductData.actions.setActiveProductVenderCode(activeProductVenderCode)).toEqual(expectedAction);
    });
  });

});
