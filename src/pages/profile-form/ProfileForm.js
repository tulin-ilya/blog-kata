/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
// import { Redirect } from 'react-router-dom';

import {
  USER_LOGIN,
  USER_REGISTRATION,
  EDIT_PROFILE,
  fetchUserLogin,
  fetchUserRegistration,
  setFormError,
} from './actions';

import {
  Card,
  Form,
  Input,
  Checkbox,
  Button,
  Divider,
  Typography,
  message,
} from 'antd';

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
    {emailInput}
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

const ProfileForm = ({
  fetchUserLogin,
  fetchUserRegistration,
  loginCondition,
  setFormError,
  formError,
}) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const switchRenderElements = (pathname) => {
    let renderForm = null;
    let renderTitle = '';
    let onFinish = () => {};
    switch (pathname) {
      case '/login':
        renderForm = loginForm;
        renderTitle = 'Sign In';
        onFinish = (values) => {
          fetchUserLogin(values);
        };
        break;
      case '/registration':
        renderForm = registerForm;
        renderTitle = 'Register';
        onFinish = (values) => {
          fetchUserRegistration(values);
        };
        break;
      case '/edit-profile':
        renderForm = editForm;
        renderTitle = 'Edit Profile';
    }
    return { renderForm, renderTitle, onFinish };
  };

  useEffect(() => {
    if (formError) {
      message.error(formError);
      setTimeout(() => setFormError(''), 500);
    }
  }, [formError]);

  useEffect(() => {
    if (loginCondition) {
      navigate('/articles');
    }
  }, [loginCondition]);

  const { renderForm, renderTitle, onFinish } = switchRenderElements(pathname);

  const { Title } = Typography;

  return (
    <Card
      className={
        !formError ? 'profile-form' : 'profile-form profile-form--error'
      }>
      <Title level={4} style={{ textAlign: 'center' }}>
        {renderTitle}
      </Title>
      <Form
        name="profile-form"
        layout="vertical"
        initialValues={{ remember: true }}
        onFinish={onFinish}>
        {renderForm}
      </Form>
    </Card>
  );
};

ProfileForm.propTypes = {
  fetchUserLogin: PropTypes.func.isRequired,
  fetchUserRegistration: PropTypes.func.isRequired,
  loginCondition: PropTypes.bool.isRequired,
  formError: PropTypes.string.isRequired,
  setFormError: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const { loginCondition, formError } = state;
  return { loginCondition, formError };
};

export default connect(mapStateToProps, {
  fetchUserLogin,
  fetchUserRegistration,
  setFormError,
})(ProfileForm);
