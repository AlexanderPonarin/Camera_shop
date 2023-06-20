import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../consts';
import { ModalViewProcess } from '../../types/state';

const initialState: ModalViewProcess = {
  reviewModalViewStatus: false,
  reviewModalSuccessViewStatus: false,
  addItemModalViewStatus: false
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
  },
});

export const {setReviewModalViewStatus, setReviewModalSuccessViewStatus, setAddItemModalViewStatus} = ModalView.actions;
