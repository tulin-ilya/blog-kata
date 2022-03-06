/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import {
  USER_LOGIN,
  USER_REGISTRATION,
  EDIT_PROFILE,
  fetchUserLogin,
  fetchUserRegistration,
  setFormError,
} from './actions';

import { Card, Form, Input, Checkbox, Button, Divider, Typography } from 'antd';

const userNameInput = (formError) => {
  return (
    <Form.Item
      label="Username"
      name="username"
      required={false}
      validateStatus={formError.username ? 'error' : ''}
      help={formError.username || ''}
      rules={[{ required: true, message: 'Please input your Username!' }]}>
      <Input placeholder="Username" />
    </Form.Item>
  );
};

const passwordInput = (formError, pathname) => {
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
      rules={
        !editCondition
          ? [{ required: true, message: 'Please input your password!' }]
          : []
      }
      hasFeedback>
      <Input.Password placeholder="Password" />
    </Form.Item>
  );
};

const confirmPasswordInput = (
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

const emailInput = (formError) => (
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

const registerForm = (formError, pathname) => (
  <React.Fragment>
    {userNameInput(formError)}
    {emailInput(formError)}
    {passwordInput(formError, pathname)}
    {confirmPasswordInput}
    <Divider />
    {agreeInput}
    {submitInput(USER_REGISTRATION)}
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Typography.Text type="secondary">
        Already have an account? <Link to={'/login'}>Sign In</Link>.
      </Typography.Text>
    </div>
  </React.Fragment>
);

const loginForm = (formError, pathname) => (
  <React.Fragment>
    {emailInput(formError)}
    {passwordInput(formError, pathname)}
    {submitInput(USER_LOGIN)}
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Typography.Text type="secondary">
        Don’t have an account? <Link to={'/registration'}>Sign Up</Link>.
      </Typography.Text>
    </div>
  </React.Fragment>
);

const editForm = (formError, pathname) => (
  <React.Fragment>
    {userNameInput(formError)}
    {emailInput(formError)}
    {passwordInput(formError, pathname)}
    {submitInput(EDIT_PROFILE)}
  </React.Fragment>
);

const ProfileForm = ({
  fetchUserLogin,
  fetchUserRegistration,
  loginCondition,
  setFormError,
  formError,
  currentUser,
}) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const switchRenderElements = (pathname) => {
    let renderForm = null;
    let renderTitle = '';
    let onFinish = () => {};
    switch (pathname) {
      case '/login':
        renderForm = loginForm(formError, pathname);
        renderTitle = 'Sign In';
        onFinish = (values) => {
          fetchUserLogin(values);
        };
        break;
      case '/registration':
        renderForm = registerForm(formError, pathname);
        renderTitle = 'Create new account';
        onFinish = (values) => {
          fetchUserRegistration(values);
        };
        break;
      case '/edit-profile':
        renderForm = editForm(formError, pathname);
        renderTitle = 'Edit Profile';
    }
    return { renderForm, renderTitle, onFinish };
  };

  useEffect(() => {
    if (Object.keys(formError).length) {
      setTimeout(() => setFormError({}), 5000);
    }
  }, [formError]);

  useEffect(() => {
    if (
      (loginCondition && pathname != '/edit-profile') ||
      (!loginCondition && pathname === '/edit-profile')
    ) {
      navigate('/articles');
    }
  }, [loginCondition]);

  const { renderForm, renderTitle, onFinish } = switchRenderElements(pathname);

  const { Title } = Typography;

  return (
    <Card className="profile-form">
      <Title level={4} style={{ textAlign: 'center' }}>
        {renderTitle}
      </Title>
      <Form
        name="profile-form"
        layout="vertical"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        fields={[
          { name: ['username'], value: currentUser.username },
          { name: ['email'], value: currentUser.email },
          { name: ['image'], value: currentUser.image },
        ]}>
        {renderForm}
      </Form>
    </Card>
  );
};

ProfileForm.propTypes = {
  fetchUserLogin: PropTypes.func.isRequired,
  fetchUserRegistration: PropTypes.func.isRequired,
  loginCondition: PropTypes.bool.isRequired,
  formError: PropTypes.shape().isRequired,
  setFormError: PropTypes.func.isRequired,
  currentUser: PropTypes.shape().isRequired,
};

const mapStateToProps = (state) => {
  const { loginCondition, formError, currentUser } = state;
  return { loginCondition, formError, currentUser };
};

export default connect(mapStateToProps, {
  fetchUserLogin,
  fetchUserRegistration,
  setFormError,
})(ProfileForm);
