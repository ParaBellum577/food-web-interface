import { SET_USER_INFO } from '../actions/types';
 
const initialState = {
  users: [],
};
 
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_INFO:
      return {
        ...state,
        users: action.payload,
      };
    default:
      return state;
  }
};
  