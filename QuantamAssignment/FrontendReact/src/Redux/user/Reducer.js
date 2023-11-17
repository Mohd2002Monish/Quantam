import {
  LOGIN_LOADING,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  SIGNUP_LOADING,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
  RESET_AUTH,
  SET_SESSION,
  INC,
} from "./ActionTypes";

const initialState = {
  loading: false,
  error: false,
  message: "",
  user: { score: [] },
  auth: false,
};

export const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case INC: {
      return {
        ...state,
        user: { ...state.user, scores: [...state.user.scores, payload] },
      };
    }
    case LOGIN_LOADING:
      return {
        ...state,
        loading: true,
        message: "",
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        message: payload.msg,
        user: {
          name: payload.userName,
          id: payload.id,
          scores: payload.scores,
        },

        auth: true,
      };
    case LOGIN_ERROR:
      return {
        ...state,
        loading: false,
        message: payload,
      };
    case RESET_AUTH:
      return {
        ...state,
        loading: false,
        error: false,
        message: "",
        auth: false,
      };

    case SIGNUP_LOADING:
      return {
        ...state,
        loading: true,
      };

    case SIGNUP_SUCCESS:
      return {
        ...state,
        loading: false,
        message: payload.msg,
      };
    case SIGNUP_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };
    case SET_SESSION:
      return {
        ...state,
        user: payload,
      };
    default:
      return state;
  }
};
