/* eslint-disable no-unused-vars */
import React from 'react';
import {connect} from 'react-redux';
import { useLocation } from 'react-router-dom';

import { USER_LOGIN, USER_REGISTRATION, EDIT_PROFILE } from './actions';

import { Card, Form, Input, Checkbox, Button, Divider, Typography } from 'antd';

const userNameInput = (
  <Form.Item
    label="Username"
    name="username"
    rules={[{ required: true, message: 'Please input your Username!' }]}>
    <Input placeholder="Username" />
  </Form.Item>
);

const passwordInput = (
  <Form.Item
    name="password"
    label="Password"
    rules={[{ required: true, message: 'Please input your password!' }]}
    hasFeedback>
    <Input.Password placeholder="Password" />
  </Form.Item>
);

const confirmPasswordInput = (
  <Form.Item
    name="confirm"
    label="Confirm Password"
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

const emailInput = (
  <Form.Item
    label="Email address"
    name="email"
    rules={[{ required: true, message: 'Please input your Email!' }]}>
    <Input placeholder="Email address" />
  </Form.Item>
);

const agreeInput = (
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

const submitInput = (formCondition) => {
  let value = '';
  switch (formCondition) {
    case USER_LOGIN:
      value = 'Login';
      break;
    case USER_REGISTRATION:
      value = 'Register';
      break;
    case EDIT_PROFILE:
      value = 'Save changes';
      break;
  }
  return (
    <Form.Item>
      <Button type="primary" htmlType="submit" className="login-form-button">
        {value}
      </Button>
    </Form.Item>
  );
};

const registerForm = (
  <React.Fragment>
    {userNameInput}
    {emailInput}
    {passwordInput}
    {confirmPasswordInput}
    <Divider />
    {agreeInput}
    {submitInput(USER_REGISTRATION)}
  </React.Fragment>
);

const loginForm = (
  <React.Fragment>
    {userNameInput}
    {passwordInput}
    {submitInput(USER_LOGIN)}
  </React.Fragment>
);

const editForm = (
  <React.Fragment>
    {userNameInput}
    {emailInput}
    {passwordInput}
    {submitInput(EDIT_PROFILE)}
  </React.Fragment>
);

const ProfileForm = () => {
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  const { Title } = Typography;

  const { pathname } = useLocation();

  const renderElement = (pathname) => {
    switch (pathname) {
      case '/login':
        return loginForm;
      case '/registration':
        return registerForm;
      case '/edit-profile':
        return editForm;
    }
  };

  const renderTitle = (pathname) => {
    switch (pathname) {
      case '/login':
        return 'Sign In';
      case '/registration':
        return 'Create new account';
    }
  };

  return (
    <Card className="profile-form">
      <Title level={4} style={{ textAlign: 'center' }}>
        {renderTitle(pathname)}
      </Title>
      <Form
        name="profile-form"
        layout="vertical"
        initialValues={{ remember: true }}
        onFinish={onFinish}>
        {renderElement(pathname)}
      </Form>
    </Card>
  );
};

const mapStateToProps = (state) => {
  return {state};
}

export default connect(mapStateToProps, {
  
})(ProfileForm);
