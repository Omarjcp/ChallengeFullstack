import {
  GET_USERS,
  GET_USERS_FOR_ID,
  CREATE_USER,
  UPDATE_USER,
  GET_IMAGES,
  CREATE_IMAGES,
  SIGN_IN,
} from "./actions";

const stateInitial = {
  usersLength: 0,
  allUsers: [],
};

export default function rootReducer(state = stateInitial, action) {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        usersLength: action.payload.length,
        allUsers: action.payload,
      };

    default:
      return state;
  }
}
