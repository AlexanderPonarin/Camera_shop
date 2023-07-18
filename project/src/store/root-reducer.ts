import {combineReducers} from '@reduxjs/toolkit';
import {NameSpace} from '../consts';
import { ProductData } from './product-data/product-data';
import { ModalView } from './modal-view-process/modal-view-process';
import { User } from './user-process/user-process';

export const rootReducer = combineReducers({
  [NameSpace.Data]: ProductData.reducer,
  [NameSpace.ModalView] : ModalView.reducer,
  [NameSpace.User] : User.reducer,
});
