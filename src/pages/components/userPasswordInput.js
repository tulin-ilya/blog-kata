import React from 'react';
import { Form, Input } from 'antd';

const passwordInputConfig = (formError, editCondition) => ({
  name: 'password',
  label: !editCondition ? 'Password' : 'New password',
  required: false,
  validateStatus:
    formError.password || formError['email or password'] ? 'error' : '',

  help: formError.password,
  rules: [
    { required: !editCondition, message: 'Please input your password!' },
    { max: 40, message: 'Password length must be to 40' },
    { min: 3, message: 'Password length must be from 6' },
  ],
  hasFeedback: true,
});

export const userPasswordInput = (formError, pathname) => {
  const editCondition = pathname === '/edit-profile';
  const config = passwordInputConfig(formError, editCondition);
  return (
    <Form.Item {...config}>
      <Input.Password placeholder="Password" />
    </Form.Item>
  );
};
