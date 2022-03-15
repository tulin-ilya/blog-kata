import { USER_LOGIN } from '../constants';

export const setLoginCondition = (isLogin) => ({ type: USER_LOGIN, isLogin });
