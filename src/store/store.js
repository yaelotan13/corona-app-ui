import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const saver = store => next => action => {
  let result = next(action);
  localStorage['redux-store'] = JSON.stringify(store.getState());
  return result;
};

const logger = store => next => action => {
  let result;
  console.groupCollapsed("dispatching", action.type);
  console.log('prev state', store.getState());
  console.log('action', action);
  result = next(action);
  console.log('next state', store.getState());
  console.groupEnd();
  return result;
};

const composeEnhancers = (typeof window !== 'undefined' && (window).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export default function storeFactory () {
  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(saver, logger, thunk))
  );
  
  console.log( store.getState() );

  return store;
}
