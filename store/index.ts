// configureStore.js

import { createStore, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
// import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import AsyncStorage from '@react-native-async-storage/async-storage';

import rootReducer from './reducers';

import logger, { createLogger } from 'redux-logger';

// const logger = createLogger({
//   collapsed: true,
//   duration: true,
//   timestamp: true,
//   level: 'info',
//   diff: false,
//   colors: {
//     title: () => 'yellow',
//     prevState: () => 'blue',
//     action: () => 'green',
//     nextState: () => 'red',
//     error: () => 'red',
//   },
// });

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default () => {
  const store = createStore(persistedReducer, applyMiddleware(logger));
  const persistor = persistStore(store);
  return { store, persistor };
}