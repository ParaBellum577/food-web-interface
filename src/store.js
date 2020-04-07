import thunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import reducers from './reducers';

const rootReducer = combineReducers(reducers);

const store = createStore( rootReducer, applyMiddleware(thunk));

export default function() {
  return store;
};