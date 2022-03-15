import { blogApi } from '../api/blogApi';

import { setFormError } from './setFormError';
import { setLoginCondition } from './setLoginCondition';

export const userCreate =
  ({ username, email, password }) =>
  async (dispatch) => {
    const data = await blogApi.createUser(username, email, password);
    if (data.errors) {
      console.log(data.errors);
      dispatch(setFormError(data.errors));
    } else {
      dispatch(setFormError({}));
      dispatch(setLoginCondition(true));
    }
  };
