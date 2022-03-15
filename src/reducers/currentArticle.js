import { SET_CURRENT_ARTICLE } from '../constants';

function currentArticle(state = {}, action) {
  switch (action.type) {
    case SET_CURRENT_ARTICLE:
      return action.currentArticle;
    default:
      return state;
  }
}

export default currentArticle;
