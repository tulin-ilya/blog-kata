import { blogApi } from '../api/blogApi';

import { setFormError } from './setFormError';

export const articleDelete = (articleSlug) => async (dispatch) => {
  const data = await blogApi.deleteArticle(articleSlug);
  if (data.errors) {
    dispatch(setFormError(data.errors));
  }
};
