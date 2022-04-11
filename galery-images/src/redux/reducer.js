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
  IMAGES_SEARCH,
} from "./actions";

const stateInitial = {
  token: "",
  msgLogin: "",
  msgCreatedUser: "",
  msgCreateImage: "",
  msgUpdateUser: "",
  userLogin: {},
  usersLength: 0,
  allUsers: [],
  allImages: [],
  imagesSearchs: [],
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

    case UPDATE_USER:
      return {
        ...state,
        msgUpdateUser: action.payload.msg,
        userLogin: action.payload.user,
      };

    case CLEAR_MSG:
      return {
        ...state,
        msgCreatedUser: "",
        msgLogin: "",
        msgCreateImage: "",
        msgUpdateUser: "",
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

    case IMAGES_SEARCH:
      return {
        ...state,
        allImages: [
          ...action.payload.data.images.filter((image) => {
            if (
              image.name
                .toLowerCase()
                .includes(action.payload.nameImage.toLowerCase())
            )
              return image;
          }),
        ],
      };

    default:
      return state;
  }
}
