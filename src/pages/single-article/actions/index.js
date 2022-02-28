/* eslint-disable no-unused-vars */
import KataBlogService from '../../../serivces/kata-blog-api';

const kataBlogService = new KataBlogService();

export const SET_CURRENT_ARTICLE = 'SET_CURRENT_ARTICLE';

export const setCurrentArticle = (currentArticle) => ({
  type: SET_CURRENT_ARTICLE,
  currentArticle,
});

export const fetchCurrentArticle = (articleSlug) => {
  return async (dispatch) => {
    const data = await kataBlogService.getArticle(articleSlug);
    dispatch(setCurrentArticle(data.article));
  };
};
