import { USER_LOGIN } from "../pages/profile-form/actions";

function loginCondition(state = false, action) {
  switch (action.type) {
    case USER_LOGIN:
      return action.loginCondition;
    default:
      return state;
  }
}

export default loginCondition;
