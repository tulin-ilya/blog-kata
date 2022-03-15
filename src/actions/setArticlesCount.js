import { SET_ARTICLES_COUNT } from '../constants';

export const setArticlesCount = (articlesCount) => ({
  type: SET_ARTICLES_COUNT,
  articlesCount,
});
