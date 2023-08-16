import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import storeMapReducer from './reducers/storeMap';
import { storeApi } from './api/store';

const rootReducer = {
  [storeApi.reducerPath]: storeApi.reducer,
  storeMap: storeMapReducer,
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(storeApi.middleware),
});

setupListeners(store.dispatch);

export default store;
