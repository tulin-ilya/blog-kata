import { SET_ARTICLES_LIST_PAGE } from '../constants';

function articlesListPage(state = 1, action) {
  switch (action.type) {
    case SET_ARTICLES_LIST_PAGE:
      return action.articlesListPage;
    default:
      return state;
  }
}

export default articlesListPage;
