import { combineReducers } from 'redux';

import articlesCount from './articlesCount';
import articlesList from './articlesList';
import articlesOffset from './articlesOffset';
import articlesListPage from './articlesListPage';
import currentArticle from './currentArticle';

export default combineReducers({
  articlesCount,
  articlesList,
  articlesListPage,
  articlesOffset,
  currentArticle,
});
