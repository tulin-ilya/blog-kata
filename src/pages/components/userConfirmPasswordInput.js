import React from 'react';
import { Form, Input } from 'antd';

const confirmPasswordInputConfig = {
  name: 'confirm',
  label: 'Confirm Password',
  required: false,
  dependencies: ['password'],
  hasFeedback: true,
  rules: [
    { required: true, message: 'Please confirm your password!' },
    ({ getFieldValue }) => ({
      validator(rule, value) {
        if (!value || getFieldValue('password') === value) {
          return Promise.resolve();
        }
        return Promise.reject(
          new Error('The two passwords that you entered do not match!')
        );
      },
    }),
  ],
};

export const userConfirmPasswordInput = () => {
  const config = confirmPasswordInputConfig;
  return (
    <Form.Item {...config}>
      <Input.Password placeholder="Confirm password" />
    </Form.Item>
  );
};
