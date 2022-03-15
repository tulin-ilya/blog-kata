import { SET_ARTICLES_LIST } from '../constants';

function articlesList(state = [], action) {
  switch (action.type) {
    case SET_ARTICLES_LIST:
      return action.articlesList;
    default:
      return state;
  }
}

export default articlesList;
