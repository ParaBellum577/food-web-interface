import axios from 'axios';
import _ from 'lodash';

import { SET_USER_INFO, GET_USER_INFO } from './types';


export const getUserInfo = () => async dispatch => {
  try {
  const res = await axios({
    url: "https://thefork.p.rapidapi.com/sale-type-menu/list?locale=en_US&id_restaurant=522995",
    method: "GET",
    headers: {
		"x-rapidapi-host": "thefork.p.rapidapi.com",
		"x-rapidapi-key": "cdc4c2db71msh49eb205775ce100p135d57jsndc3018e16b2f",
  }
});
  dispatch({ 
      type: GET_USER_INFO, 
      payload: res 
  });
  } catch (error) {
    console.log('getUserInfo error:', error);
  }
};

export const setUserInfo = data => async dispatch => {
  try {
  dispatch({ 
      type: SET_USER_INFO, 
      payload: data
  });
  } catch (error) {
    console.log('setUserInfo error:', error);
  }
};
