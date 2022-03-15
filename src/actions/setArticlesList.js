import { SET_ARTICLES_LIST } from '../constants';

export const setArticlesList = (articlesList) => ({
  type: SET_ARTICLES_LIST,
  articlesList,
});
