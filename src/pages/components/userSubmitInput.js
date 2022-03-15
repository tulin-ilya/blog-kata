import React from 'react';
import { Form, Button } from 'antd';

import { USER_LOGIN, USER_REGISTRATION, EDIT_PROFILE } from '../../constants';

export const userSubmitInput = (formCondition) => {
  let value = '';
  switch (formCondition) {
    case USER_LOGIN:
      value = 'Login';
      break;
    case USER_REGISTRATION:
      value = 'Create';
      break;
    case EDIT_PROFILE:
      value = 'Save changes';
      break;
  }
  return (
    <Form.Item>
      <Button
        block
        type="primary"
        htmlType="submit"
        className="login-form-button">
        {value}
      </Button>
    </Form.Item>
  );
};
