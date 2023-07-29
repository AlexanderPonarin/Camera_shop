import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { fetchProductsAction, fetchPromoProductAction } from './store/api-action';
import HistoryRouter from './components/history-route/history-route';
import browserHistory from './types/browser-history';
import { persistor, store } from './store';
import { PersistGate } from 'redux-persist/integration/react';
import LoadingScreen from './pages/loading-screen/loading-screen';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);


store.dispatch(fetchProductsAction());
store.dispatch(fetchPromoProductAction());

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={<LoadingScreen />} persistor={persistor}>
        <HistoryRouter history={browserHistory}>
          <ToastContainer />
          <App />
        </HistoryRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
);
