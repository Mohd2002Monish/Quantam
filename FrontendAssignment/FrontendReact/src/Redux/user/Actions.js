import {
  LOGIN_LOADING,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  SIGNUP_LOADING,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
} from "./ActionTypes";
import axios from "axios";

export const login = (user) => async (dispatch) => {
  try {
    dispatch({
      type: LOGIN_LOADING,
    });
    const { data } = await axios.post(
      "https://emitrrbackend.onrender.com/signin",
      user
    );

    dispatch({
      type: LOGIN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LOGIN_ERROR,
      payload: error.response.data.msg,
    });
  }
};

export const signup = (user) => async (dispatch) => {
  try {
    dispatch({
      type: SIGNUP_LOADING,
    });
    const { data } = await axios.post(
      "https://emitrrbackend.onrender.com/signup",
      user
    );

    dispatch({
      type: SIGNUP_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SIGNUP_ERROR,
      payload: error.response.data.message,
    });
  }
};
