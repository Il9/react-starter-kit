import { createStore, compose, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import { rootReducer, rootSaga } from '@store/modules';

// Store Creator
const confiureStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware];

  const enhancer =
    process.env.NODE_ENV === 'production'
      ? compose(applyMiddleware(...middlewares))
      : composeWithDevTools(applyMiddleware(...middlewares));

  // Create Store
  const store = createStore(rootReducer, enhancer);

  // Connect Middleware
  sagaMiddleware.run(rootSaga);

  return store;
};

export default confiureStore;
