import { SET_USER_INFO, GET_USER_INFO } from '../actions/types';
 
const initialState = {
  users: [],
  userInfo: [],
};
 
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_INFO:
      return {
        ...state,
        users: action.payload,
      };
    case SET_USER_INFO:
      return {
        ...state,
        userInfo: action.payload,
      };
    default:
      return state;
  }
};
  