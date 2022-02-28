import { SET_LOADING_CONDITION } from '../containers/app/actions';

function loadingCondition(state = true, action) {
  switch (action.type) {
    case SET_LOADING_CONDITION:
      return action.loadingCondition;
    default:
      return state;
  }
}

export default loadingCondition;
