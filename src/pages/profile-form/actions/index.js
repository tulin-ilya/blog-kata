/* eslint-disable no-unused-vars */
import KataBlogService from '../../../serivces/kata-blog-api';

const kataBlogService = new KataBlogService();

export const USER_REGISTRATION = 'USER_REGISTRATION';
export const EDIT_PROFILE = 'EDIT_PROFILE';
export const USER_LOGIN = 'USER_LOGIN';
export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const SET_FORM_ERROR = 'SET_FORM_ERROR';

export const setLoginCondition = (isLogin) => ({ type: USER_LOGIN, isLogin });

export const setFormError = (formError) => ({
  type: SET_FORM_ERROR,
  formError,
});

export const setCurrentUser = (currentUser) => ({
  type: SET_CURRENT_USER,
  currentUser,
});

export const fetchUserRegistration =
  ({ username, email, password }) =>
  async (dispatch) => {
    const data = await kataBlogService.createUser(username, email, password);
    if (data.errors) {
      const error = JSON.stringify(data.errors);
      dispatch(setFormError(error));
    } else {
      dispatch(setFormError(''));
      dispatch(setLoginCondition(true));
      dispatch(setCurrentUser(data.user));
    }
  };

// export const <youractionName> = () => async (dispatch) => {}

export const fetchUserLogin =
  ({ email, password }) =>
  async (dispatch) => {
    const data = await kataBlogService.login(email, password);
    if (data.errors) {
      const error = JSON.stringify(data.errors);
      dispatch(setFormError(error));
    } else {
      dispatch(setFormError(''));
      dispatch(setLoginCondition(true));
      dispatch(setCurrentUser(data.user));
    }
  };
