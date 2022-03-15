import { USER_LOGIN } from '../constants';

function loginCondition(state = false, action) {
  switch (action.type) {
    case USER_LOGIN:
      return action.isLogin;
    default:
      return state;
  }
}

export default loginCondition;
