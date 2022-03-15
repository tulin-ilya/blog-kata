import { SET_LOADING_CONDITION } from '../constants';

export const setLoadingCondition = (loadingCondition) => ({
  type: SET_LOADING_CONDITION,
  loadingCondition,
});
