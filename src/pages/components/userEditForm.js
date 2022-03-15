import React from 'react';

import { EDIT_PROFILE } from '../../constants';

import { userEmailInput } from '../components/userEmailInput';
import { userImageURLInput } from '../components/userImageURLInput';
import { userNameInput } from '../components/userNameInput';
import { userPasswordInput } from '../components/userPasswordInput';
import { userSubmitInput } from '../components/userSubmitInput';

export const userEditForm = (formError, pathname) => (
  <React.Fragment>
    {userNameInput(formError)}
    {userEmailInput(formError)}
    {userPasswordInput(formError, pathname)}
    {userImageURLInput()}
    {userSubmitInput(EDIT_PROFILE)}
  </React.Fragment>
);
