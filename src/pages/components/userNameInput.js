import React from 'react';
import { Form, Input } from 'antd';

const usernameInputConfig = (formError) => ({
  label: 'Username',
  name: 'username',
  required: false,
  validateStatus: formError.username ? 'error' : '',
  help: formError.username || '',
  rules: [
    { required: true, message: 'Please input your Username!' },
    { max: 20, message: 'Username length must be to 20' },
    { min: 3, message: 'Username length must be from 3' },
  ],
});

export const userNameInput = (formError) => {
  const config = usernameInputConfig(formError);
  return (
    <Form.Item {...config}>
      <Input placeholder="Username" />
    </Form.Item>
  );
};
