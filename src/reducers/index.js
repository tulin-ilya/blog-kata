import { combineReducers } from "redux";

import articlesCount from "./articlesCount";
import articlesList from "./articlesList";
import articlesOffset from "./articlesOffset";
import articlesListPage from "./articlesListPage";
import currentArticle from "./currentArticle";
import loadingCondition from "./loadingCondition";
import loginCondition from "./loginCondition";

export default combineReducers({
  articlesCount,
  articlesList,
  articlesListPage,
  articlesOffset,
  currentArticle,
  loadingCondition,
  loginCondition,
});
