import { SET_ARTICLES_LIST_PAGE } from '../constants';

export const setArticlesListPage = (articlesListPage) => ({
  type: SET_ARTICLES_LIST_PAGE,
  articlesListPage,
});
