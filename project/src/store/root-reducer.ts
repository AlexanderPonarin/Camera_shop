import {combineReducers} from '@reduxjs/toolkit';
import {NameSpace} from '../consts';
import { ProductData } from './product-data/product-data';

export const rootReducer = combineReducers({
  [NameSpace.Data]: ProductData.reducer,
});
