import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import { fetchUserLogin, fetchUserRegistration, setFormError } from './actions';

import { Card, Form, Typography } from 'antd';

import { registerForm, loginForm, editForm } from './forms';

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

  const { renderForm, renderTitle, onFinish } = ((pathname) => {
    const renderStack = {};
    switch (pathname) {
      case '/login':
        renderStack.renderForm = loginForm(formError, pathname);
        renderStack.renderTitle = 'Sign In';
        renderStack.onFinish = (values) => {
          fetchUserLogin(values);
        };
        break;
      case '/registration':
        renderStack.renderForm = registerForm(formError, pathname);
        renderStack.renderTitle = 'Create new account';
        renderStack.onFinish = (values) => {
          fetchUserRegistration(values);
        };
        break;
      case '/edit-profile':
        renderStack.renderForm = editForm(formError, pathname);
        renderStack.renderTitle = 'Edit Profile';
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
