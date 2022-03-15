import React from 'react';
import { Form, Input } from 'antd';

export const emailInputConfig = (formError) => ({
  label: 'Email address',
  name: 'email',
  validateStatus:
    formError.email || formError['email or password'] ? 'error' : '',

  help: formError.email,
  required: false,
  rules: [
    { required: true, message: 'Please input your Email!' },
    {
      type: 'email',
      message: 'The input is not valid E-mail!',
    },
  ],
});

export const userEmailInput = (formError) => {
  const config = emailInputConfig(formError);
  return (
    <Form.Item {...config}>
      <Input placeholder="Email address" />
    </Form.Item>
  );
};
