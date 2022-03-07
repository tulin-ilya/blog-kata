/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import {
  fetchUserLogin,
  fetchUserRegistration,
  fetchEditProfile,
  setFormError,
} from './actions';

import { Card, Form, Typography } from 'antd';

import { registerForm, loginForm, editForm } from './forms';

const ProfileForm = ({
  fetchUserLogin,
  fetchUserRegistration,
  fetchEditProfile,
  loginCondition,
  setFormError,
  formError,
}) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { username, email, image } =
    JSON.parse(localStorage.getItem('currentUser')) || {};

  const { renderForm, renderTitle, onFinish } = ((pathname) => {
    const renderStack = {};
    switch (pathname) {
      case '/login':
        renderStack.renderForm = loginForm(formError, pathname);
        renderStack.renderTitle = 'Sign In';
        renderStack.onFinish = (values) => fetchUserLogin(values);
        break;
      case '/registration':
        renderStack.renderForm = registerForm(formError, pathname);
        renderStack.renderTitle = 'Create new account';
        renderStack.onFinish = (values) => fetchUserRegistration(values);
        break;
      case '/edit-profile':
        renderStack.renderForm = editForm(formError, pathname);
        renderStack.renderTitle = 'Edit Profile';
        renderStack.onFinish = (values) => {
          fetchEditProfile(values);
          navigate('/articles');
        };
    }
    return renderStack;
  })(pathname);

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
          { name: ['username'], value: username },
          { name: ['email'], value: email },
          { name: ['image'], value: image },
        ]}>
        {renderForm}
      </Form>
    </Card>
  );
};

ProfileForm.propTypes = {
  fetchUserLogin: PropTypes.func.isRequired,
  fetchUserRegistration: PropTypes.func.isRequired,
  fetchEditProfile: PropTypes.func.isRequired,
  loginCondition: PropTypes.bool.isRequired,
  setFormError: PropTypes.func.isRequired,
  formError: PropTypes.shape().isRequired,
};

const mapStateToProps = (state) => {
  const { loginCondition, formError } = state;
  return { loginCondition, formError };
};

export default connect(mapStateToProps, {
  fetchUserLogin,
  fetchUserRegistration,
  fetchEditProfile,
  setFormError,
})(ProfileForm);
