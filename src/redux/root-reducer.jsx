import AsyncStorage from '@react-native-async-storage/async-storage';
import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import {apiStatusReducer} from './api-status-reducer';
import {userReducer} from './user';
import {drawersStatusReducer} from './drawersStatus';
import {themeColorReducer} from './themeColor';

const combinedReducer = combineReducers({
  apiStatus: apiStatusReducer,
  user: userReducer,
  drawersStatus: drawersStatusReducer,
  themeColor: themeColorReducer,
});

const rootReducer = (state, action) => {
  let stateData = state;
  if (action.type === 'logout/clearReducer') {
    stateData = {};
  }

  return combinedReducer(stateData, action);
};

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['user', 'themeColor'],
};

export const persistedReducer = persistReducer(persistConfig, rootReducer);
