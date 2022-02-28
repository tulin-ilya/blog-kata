import KataBlogService from '../../../serivces/kata-blog-api';
import { setLoadingCondition } from '../../../containers/app/actions';
import { setCurrentArticle } from '../../single-article/actions';

const kataBlogService = new KataBlogService();

export const SET_ARTICLES_LIST = 'SET_ARTICLES_LIST';
export const SET_ARTICLES_COUNT = 'SET_ARTICLES_COUNT';
export const SET_ARTICLES_LIST_PAGE = 'SET_ARTICLE_LIST_PAGE';
export const SET_ARTICLES_OFFSET = 'SET_ARTICLE_OFFSET';

export const setArticlesList = (articlesList) => ({
  type: SET_ARTICLES_LIST,
  articlesList,
});
export const setArticlesCount = (articlesCount) => ({
  type: SET_ARTICLES_COUNT,
  articlesCount,
});
export const setArticlesListPage = (articlesListPage) => ({
  type: SET_ARTICLES_LIST_PAGE,
  articlesListPage,
});
export const setArticlesOffset = (articlesOffset) => ({
  type: SET_ARTICLES_OFFSET,
  articlesOffset,
});

export const fetchArticles = (offset) => {
  return async (dispatch) => {
    const data = await kataBlogService.getArticles(offset);
    const { articles, articlesCount } = data;
    dispatch(setArticlesList(articles));
    dispatch(setArticlesCount(articlesCount));
    dispatch(setLoadingCondition(false));
    dispatch(setCurrentArticle({}));
  };
};
