import axios from 'axios';
import _ from 'lodash';

import { SET_USER_INFO } from './types';


export const setUserInfo = () => async dispatch => {
  try {
  const res = await axios({
        method: 'GET',
        url: "https://reqres.in/api/users",
        type: "POST",
        data: {
            name: "paul rudd",
            movies: ["I Love You Man", "Role Models"]
        },
  });
  dispatch({ 
      type: SET_USER_INFO, 
      payload: res 
  });
  } catch (error) {
    console.log('setUserInfo error:', error);
  }
};
