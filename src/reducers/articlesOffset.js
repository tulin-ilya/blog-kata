import { SET_ARTICLES_OFFSET } from '../constants';

function articlesOffset(state = 0, action) {
  switch (action.type) {
    case SET_ARTICLES_OFFSET:
      return action.articlesOffset;
    default:
      return state;
  }
}

export default articlesOffset;
