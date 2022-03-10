import React from 'react';
import { Link } from 'react-router-dom';

import { USER_LOGIN, USER_REGISTRATION, EDIT_PROFILE } from '../actions';

import { Divider, Typography } from 'antd';

import {
  userNameInput,
  emailInput,
  passwordInput,
  confirmPasswordInput,
  agreeInput,
  submitInput,
  imageURL,
} from '../inputs';

export const registerForm = (formError, pathname) => {
  return (
    <React.Fragment>
      {userNameInput(formError)}
      {emailInput(formError)}
      {passwordInput(formError, pathname)}
      {confirmPasswordInput()}
      <Divider />
      {agreeInput}
      {submitInput(USER_REGISTRATION)}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Typography.Text type="secondary">
          Already have an account? <Link to={'/login'}>Sign In</Link>.
        </Typography.Text>
      </div>
    </React.Fragment>
  );
};

export const loginForm = (formError, pathname) => {
  return (
    <React.Fragment>
      {emailInput(formError)}
      {passwordInput(formError, pathname)}
      {submitInput(USER_LOGIN)}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Typography.Text type="secondary">
          Don’t have an account? <Link to={'/registration'}>Sign Up</Link>.
        </Typography.Text>
      </div>
    </React.Fragment>
  );
};

export const editForm = (formError, pathname) => {
  return (
    <React.Fragment>
      {userNameInput(formError)}
      {emailInput(formError)}
      {passwordInput(formError, pathname)}
      {imageURL()}
      {submitInput(EDIT_PROFILE)}
    </React.Fragment>
  );
};
