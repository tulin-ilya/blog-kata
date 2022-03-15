import { SET_FORM_ERROR } from '../constants';

export const setFormError = (formError) => ({
  type: SET_FORM_ERROR,
  formError,
});
