import { SET_CURRENT_ARTICLE } from '../constants';

export const setCurrentArticle = (currentArticle) => ({
  type: SET_CURRENT_ARTICLE,
  currentArticle,
});
