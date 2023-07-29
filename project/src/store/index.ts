import {configureStore} from '@reduxjs/toolkit';
import { createAPI } from '../services/api';
import { persistedReducer } from './root-reducer';
import { redirect } from './middlewares/redirect';
import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist';
export const api = createAPI();

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(redirect),
});

export const persistor = persistStore(store);
