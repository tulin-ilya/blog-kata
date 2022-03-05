import { SET_CURRENT_USER } from '../pages/profile-form/actions';

function currentUser(state = {}, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return action.currentUser;
    default:
      return state;
  }
}

export default currentUser;
