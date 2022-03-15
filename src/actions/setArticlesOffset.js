import { SET_ARTICLES_OFFSET } from '../constants';

export const setArticlesOffset = (articlesOffset) => ({
  type: SET_ARTICLES_OFFSET,
  articlesOffset,
});
