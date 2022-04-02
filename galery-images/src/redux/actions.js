import axios from "axios";

import instance from "./server/index";
const urlServer = "http://localhost:3001/";

//CONSTS OF ACTIONS

//USERS
export const GET_USERS = "GET_USERS";
export const GET_USERS_FOR_ID = "GET_USERS_FOR_ID";
export const CREATE_USER = "CREATE_USER";
export const UPDATE_USER = "UPDATE_USER";

//IMAGES
export const GET_IMAGES = "GET_IMAGES";
export const CREATE_IMAGES = "CREATE_IMAGES";

//LOGIN
export const SIGN_IN = "SIGN_IN";

//ACTIOS

export function signIn(payload) {
  return async function (dispatch) {
    try {
      const { data } = await axios.post(urlServer, payload);
      if (data.token) {
        localStorage.setItem("token", data.token);
        return dispatch({ type: SIGN_IN, payload: data });
      }
    } catch (err) {
      console.log(err);
    }
  };
}

export function createUser(payload) {
  return async function (dispatch) {
    try {
      const { data } = await axios.post(urlServer + "user", payload);
      return dispatch({ type: CREATE_USER, payload: data });
    } catch (err) {
      console.log(err);
    }
  };
}

export function getUsers() {
  return async function (dispatch) {
    try {
      const { data } = await axios(urlServer + "user");
      return dispatch({ type: GET_USERS, payload: data });
    } catch (err) {
      console.log(err);
    }
  };
}

export function getUserForId(id) {
  return async function (dispatch) {
    try {
      const { data } = await axios(urlServer + "user" + id);
      return dispatch({ type: GET_USERS_FOR_ID, payload: data });
    } catch (err) {
      console.log(err);
    }
  };
}

export function updateUser(id, payload) {
  return async function (dispatch) {
    try {
      const { data } = await instance.put("user/" + id, payload);
      return dispatch({ type: UPDATE_USER, payload: data });
    } catch (err) {
      console.log(err);
    }
  };
}

export function createImage(payload) {
  return async function (dispatch) {
    try {
      const { data } = await instance.post("image", payload);
      return dispatch({ type: CREATE_IMAGES, payload: data });
    } catch (err) {
      console.log(err);
    }
  };
}

export function getImages() {
  return async function (dispatch) {
    try {
      const { data } = await axios(urlServer + "image");
      return dispatch({ type: GET_IMAGES, payload: data });
    } catch (err) {
      console.log(err);
    }
  };
}
