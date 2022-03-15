import React from 'react';
import { Link } from 'react-router-dom';
import { Typography } from 'antd';

import { USER_LOGIN } from '../../constants';

import { userEmailInput } from '../components/userEmailInput';
import { userPasswordInput } from '../components/userPasswordInput';
import { userSubmitInput } from '../components/userSubmitInput';

export const userLoginForm = (formError, pathname) => {
  return (
    <React.Fragment>
      {userEmailInput(formError)}
      {userPasswordInput(formError, pathname)}
      {userSubmitInput(USER_LOGIN)}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Typography.Text type="secondary">
          Don’t have an account? <Link to={'/registration'}>Sign Up</Link>.
        </Typography.Text>
      </div>
    </React.Fragment>
  );
};
