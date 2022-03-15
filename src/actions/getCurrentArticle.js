import { blogApi } from '../api/blogApi';

import { setCurrentArticle } from './setCurrentArticle';
import { setLoadingCondition } from './setLoadingCondition';

export const getCurrentArticle = (articleSlug) => {
  return async (dispatch) => {
    const data = await blogApi.getArticle(articleSlug);
    dispatch(setCurrentArticle(data.article));
    dispatch(setLoadingCondition(false));
  };
};
