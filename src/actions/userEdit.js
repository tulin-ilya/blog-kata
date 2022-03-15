import { blogApi } from '../api/blogApi';

import { setFormError } from './setFormError';

export const userEdit =
  ({ username, email, password, image }, token) =>
  async (dispatch) => {
    const data = await blogApi.updCurrentUser(
      email,
      username,
      image,
      password,
      token
    );
    if (data.errors) {
      dispatch(setFormError(data.errors));
    }
  };
