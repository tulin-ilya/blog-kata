import KataBlogService from '../../../serivces/kata-blog-api';

import { setFormError } from '../../profile-form/actions';

const kataBlogService = new KataBlogService();

export const fetchEditArticle = (slug, article) => async (dispatch) => {
  const { title, body, description, tagList } = article;
  const data = await kataBlogService.updArticle(
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

export const fetchNewArticle = (article) => async (dispatch) => {
  const { title, body, description, tagList } = article;
  const data = await kataBlogService.createNewArticle(
    title,
    description,
    body,
    tagList
  );
  if (data.errors) {
    dispatch(setFormError(data.errors));
  }
};
