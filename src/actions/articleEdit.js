import { blogApi } from '../api/blogApi';

import { setFormError } from './setFormError';

export const articleEdit = (slug, article) => async (dispatch) => {
  const { title, body, description, tagList } = article;
  const data = await blogApi.updArticle(
    slug,
    title,
    description,
    body,
    tagList
  );
  if (data.errors) {
    dispatch(setFormError(data.errors));
  }
};
