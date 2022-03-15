import { blogApi } from '../api/blogApi';

import { setArticlesList } from './setArticlesList';
import { setArticlesCount } from './setArticlesCount';
import { setLoadingCondition } from './setLoadingCondition';
import { setCurrentArticle } from './setCurrentArticle';

export const getArticles = (offset) => {
  return async (dispatch) => {
    const data = await blogApi.getArticles(offset);
    const { articles, articlesCount } = data;
    dispatch(setArticlesList(articles));
    dispatch(setArticlesCount(articlesCount));
    dispatch(setLoadingCondition(false));
    dispatch(setCurrentArticle({}));
  };
};
