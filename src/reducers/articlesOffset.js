import { SET_ARTICLE_OFFSET } from '../pages/articles-list/actions';

function articlesOffset(state = 0, action) {
  switch (action.type) {
    case SET_ARTICLE_OFFSET:
      return action.articlesOffset;
    default:
      return state;
  }
}

export default articlesOffset;
