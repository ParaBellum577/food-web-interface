import { createStore } from 'redux';
import combineReducers from './reducers'


export default preloadedState => {
  return createStore(combineReducers, preloadedState);
};