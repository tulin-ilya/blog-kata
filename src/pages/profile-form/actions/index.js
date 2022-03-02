/* eslint-disable no-unused-vars */
import KataBlogService from "../../../serivces/kata-blog-api";

const kataBlogService = new KataBlogService();

export const USER_REGISTRATION = "USER_REGISTRATION";
export const EDIT_PROFILE = "EDIT_PROFILE";
export const USER_LOGIN = "USER_LOGIN";
export const SET_CURRENT_USER = "SET_CURRENT_USER";

export const setLoginCondition = (isLogin) => ({ type: USER_LOGIN, isLogin });
export const setCurrentUser = (currentUser) => ({
  type: SET_CURRENT_USER,
  currentUser,
});

export const fetchUserLogin = (email, password) => {
  return async (dispatch) => {
    const data = await kataBlogService.login(email, password);
    if (data.error) {
      console.log("hello");
    } else {
      dispatch(setLoginCondition(true));
      dispatch(setCurrentUser(data.user));
    }
  };
};
