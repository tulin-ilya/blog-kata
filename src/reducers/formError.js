import { SET_FORM_ERROR } from "../pages/profile-form/actions";

function formError(state = {}, action) {
  switch (action.type) {
    case SET_FORM_ERROR:
      return action.formError;
    default:
      return state;
  }
}

export default formError;
