import React from 'react';
import { Link } from 'react-router-dom';
import { Divider, Typography } from 'antd';

import { USER_REGISTRATION } from '../../constants';

import { userAgreeInput } from '../components/userAgreeInput';
import { userConfirmPasswordInput } from '../components/userConfirmPasswordInput';
import { userEmailInput } from '../components/userEmailInput';
import { userNameInput } from '../components/userNameInput';
import { userPasswordInput } from '../components/userPasswordInput';
import { userSubmitInput } from '../components/userSubmitInput';

export const userCreateForm = (formError, pathname) => (
  <React.Fragment>
    {userNameInput(formError)}
    {userEmailInput(formError)}
    {userPasswordInput(formError, pathname)}
    {userConfirmPasswordInput()}
    <Divider />
    {userAgreeInput}
    {userSubmitInput(USER_REGISTRATION)}
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Typography.Text type="secondary">
        Already have an account? <Link to={'/login'}>Sign In</Link>.
      </Typography.Text>
    </div>
  </React.Fragment>
);
