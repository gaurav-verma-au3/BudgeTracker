import {configureStore} from '@reduxjs/toolkit';
import {persistStore} from 'redux-persist';
import {persistedReducer} from './root-reducer';
const createDebugger = require('redux-flipper').default;

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat(createDebugger()),
});

persistStore(store);
