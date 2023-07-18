import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../consts';
import { ModalViewProcess } from '../../types/state';

const initialState: ModalViewProcess = {
  reviewModalViewStatus: false,
  reviewModalSuccessViewStatus: false,
  addItemModalViewStatus: false,
  addItemSuccessModalViewStatus: false,
  itemBasketSuccessViewStatus: false,
  basketRemoveItemModalViewStatus: false,
};

export const ModalView = createSlice({
  name: NameSpace.ModalView,
  initialState,
  reducers: {
    setReviewModalViewStatus: (state, action: PayloadAction<boolean>) => {
      state.reviewModalViewStatus = action.payload;
    },
    setReviewModalSuccessViewStatus: (state, action: PayloadAction<boolean>) => {
      state.reviewModalSuccessViewStatus = action.payload;
    },
    setAddItemModalViewStatus: (state, action: PayloadAction<boolean>) => {
      state.addItemModalViewStatus = action.payload;
    },
    setAddItemSuccessModalViewStatus: (state, action: PayloadAction<boolean>) => {
      state.addItemSuccessModalViewStatus = action.payload;
    },
    setItemBasketSuccessModalViewStatus: (state, action: PayloadAction<boolean>) => {
      state.itemBasketSuccessViewStatus = action.payload;
    },
    setBasketRemoveItemModalViewStatus: (state, action: PayloadAction<boolean>) => {
      state.basketRemoveItemModalViewStatus = action.payload;
    },
  },
});

export const {setReviewModalViewStatus,
  setReviewModalSuccessViewStatus,
  setAddItemModalViewStatus,
  setAddItemSuccessModalViewStatus,
  setItemBasketSuccessModalViewStatus,
  setBasketRemoveItemModalViewStatus
} = ModalView.actions;
