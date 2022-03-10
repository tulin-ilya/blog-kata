import React from 'react';
import { Form, Input, Checkbox, Button } from 'antd';

import { USER_LOGIN, USER_REGISTRATION, EDIT_PROFILE } from '../actions';
import {
  usernameInputConfig,
  passwordInputConfig,
  confirmPasswordInputConfig,
  emailInputConfig,
  imageURLConfig,
} from './config';

export const userNameInput = (formError) => {
  const config = usernameInputConfig(formError);
  return (
    <Form.Item {...config}>
      <Input placeholder="Username" />
    </Form.Item>
  );
};

export const passwordInput = (formError, pathname) => {
  const editCondition = pathname === '/edit-profile';
  const config = passwordInputConfig(formError, editCondition);
  return (
    <Form.Item {...config}>
      <Input.Password placeholder="Password" />
    </Form.Item>
  );
};

export const confirmPasswordInput = () => {
  const config = confirmPasswordInputConfig;
  return (
    <Form.Item {...config}>
      <Input.Password placeholder="Confirm password" />
    </Form.Item>
  );
};

export const emailInput = (formError) => {
  const config = emailInputConfig(formError);
  return (
    <Form.Item {...config}>
      <Input placeholder="Email address" />
    </Form.Item>
  );
};
export const imageURL = () => {
  const config = imageURLConfig;
  return (
    <Form.Item {...config}>
      <Input placeholder="Avatar image" />
    </Form.Item>
  );
};

export const agreeInput = (
  <Form.Item
    name="agreement"
    valuePropName="checked"
    rules={[
      {
        validator: (rule, value) =>
          value
            ? Promise.resolve()
            : Promise.reject(new Error('Should accept agreement')),
      },
    ]}>
    <Checkbox>I agree to the processing of my personal information</Checkbox>
  </Form.Item>
);

export const submitInput = (formCondition) => {
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
