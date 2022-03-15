import { blogApi } from '../api/blogApi';

import { setFormError } from './setFormError';
import { setLoginCondition } from './setLoginCondition';

export const userLogin =
  ({ email, password }) =>
  async (dispatch) => {
    const data = await blogApi.login(email, password);
    if (data.errors) {
      dispatch(setFormError(data.errors));
    } else {
      dispatch(setFormError({}));
      dispatch(setLoginCondition(true));
    }
  };
