import {
  GET_USERS,
  GET_USERS_FOR_ID,
  CREATE_USER,
  UPDATE_USER,
  GET_IMAGES,
  CREATE_IMAGES,
  SIGN_IN,
  LOG_OUT,
  CLEAR_MSG,
} from "./actions";

const stateInitial = {
  token: "",
  msgLogin: "",
  msgCreatedUser: "",
  msgCreateImage: "",
  userLogin: {},
  usersLength: 0,
  allUsers: [],
  allImages: [],
};

export default function rootReducer(state = stateInitial, action) {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        usersLength: action.payload.length,
        allUsers: action.payload,
      };

    case GET_USERS_FOR_ID:
      return {
        ...state,
        userLogin: action.payload.user,
      };

    case SIGN_IN:
      return {
        ...state,
        token: action.payload.token,
        msgLogin: action.payload.msg,
        userLogin: action.payload.user,
        setIdStorage: localStorage.setItem("id", action.payload.user.id),
      };

    case LOG_OUT:
      return {
        ...state,
        token: "",
        msgLogin: "",
        userLogin: {},
      };

    case CREATE_USER:
      return {
        ...state,
        msgCreatedUser: action.payload.msg,
      };

    case CLEAR_MSG:
      return {
        ...state,
        msgCreatedUser: "",
        msgLogin: "",
        msgCreateImage: "",
      };

    case GET_IMAGES:
      return {
        ...state,
        allImages: action.payload.images,
      };

    case CREATE_IMAGES:
      return {
        ...state,
        msgCreateImage: action.payload.msg,
      };

    default:
      return state;
  }
}
