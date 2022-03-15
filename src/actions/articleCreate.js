import { blogApi } from '../api/blogApi';

import { setFormError } from './setFormError';

export const articleCreate = (article) => async (dispatch) => {
  const { title, body, description, tagList } = article;
  const data = await blogApi.createNewArticle(
    title,
    description,
    body,
    tagList
  );
  if (data.errors) {
    dispatch(setFormError(data.errors));
  }
};
