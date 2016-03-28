import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import customerToolReducer from './reducers/customer-tool';

export const createAppStore = function() {
  const finalCreateStore = compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )(createStore);

  return finalCreateStore(customerToolReducer);
};