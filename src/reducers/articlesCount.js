import { SET_ARTICLES_COUNT } from '../pages/articles-list/actions';

function articlesCount(state = 0, action) {
  switch (action.type) {
    case SET_ARTICLES_COUNT:
      return action.articlesCount;
    default:
      return state;
  }
}

export default articlesCount;
