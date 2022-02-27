import { combineReducers } from 'redux';

import articlesCount from './articlesCount';
import articlesList from './articlesList';
import articlesOffset from './articlesOffset';

export default combineReducers({
  articlesCount,
  articlesList,
  articlesOffset,
});
