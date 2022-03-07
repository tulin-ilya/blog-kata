import React from 'react';

import { USER_LOGIN, USER_REGISTRATION, EDIT_PROFILE } from '../actions';

import { Form, Input, Checkbox, Button } from 'antd';

export const userNameInput = (formError) => {
  return (
    <Form.Item
      label="Username"
      name="username"
      required={false}
      validateStatus={formError.username ? 'error' : ''}
      help={formError.username || ''}
      rules={[
        { required: true, message: 'Please input your Username!' },
        { max: 20, message: 'Username length must be to 20' },
        { min: 3, message: 'Username length must be from 3' },
      ]}>
      <Input placeholder="Username" />
    </Form.Item>
  );
};

export const passwordInput = (formError, pathname) => {
  const editCondition = pathname === '/edit-profile';
  return (
    <Form.Item
      name="password"
      label={!editCondition ? 'Password' : 'New password'}
      required={false}
      validateStatus={
        formError.password || formError['email or password'] ? 'error' : ''
      }
      help={formError.password}
      rules={[
        { required: !editCondition, message: 'Please input your password!' },
        { max: 40, message: 'Password length must be to 40' },
        { min: 6, message: 'Password length must be from 6' },
      ]}
      hasFeedback>
      <Input.Password placeholder="Password" />
    </Form.Item>
  );
};

export const confirmPasswordInput = (
  <Form.Item
    name="confirm"
    label="Confirm Password"
    required={false}
    dependencies={['password']}
    hasFeedback
    rules={[
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
    ]}>
    <Input.Password placeholder="Confirm password" />
  </Form.Item>
);

export const emailInput = (formError) => (
  <Form.Item
    label="Email address"
    name="email"
    validateStatus={
      formError.email || formError['email or password'] ? 'error' : ''
    }
    help={formError.email}
    required={false}
    rules={[
      { required: true, message: 'Please input your Email!' },
      {
        type: 'email',
        message: 'The input is not valid E-mail!',
      },
    ]}>
    <Input placeholder="Email address" />
  </Form.Item>
);
export const imageURL = (
  <Form.Item
    name="image"
    label="Avatar image (url)"
    rules={[{ type: 'url', message: 'Please input correcet URL-address' }]}>
    <Input placeholder="Avatar image" />
  </Form.Item>
);

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
