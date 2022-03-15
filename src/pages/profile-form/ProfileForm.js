import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import { setFormError } from '../../actions/setFormError';
import { userLogin } from '../../actions/userLogin';
import { userCreate } from '../../actions/userCreate';
import { userEdit } from '../../actions/userEdit';

import { Card, Form, Typography } from 'antd';

import { userCreateForm } from '../components/userCreateForm';
import { userLoginForm } from '../components/userLoginForm';
import { userEditForm } from '../components/userEditForm';

const { Title } = Typography;

const ProfileForm = ({
  userLogin,
  userCreate,
  userEdit,
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
        renderStack.renderForm = userLoginForm(formError, pathname);
        renderStack.renderTitle = 'Sign In';
        renderStack.onFinish = (values) => userLogin(values);
        break;
      case '/registration':
        renderStack.renderForm = userCreateForm(formError, pathname);
        renderStack.renderTitle = 'Create new account';
        renderStack.onFinish = (values) => userCreate(values);
        break;
      case '/edit-profile':
        renderStack.renderForm = userEditForm(formError, pathname);
        renderStack.renderTitle = 'Edit Profile';
        renderStack.onFinish = (values) => {
          userEdit(values);
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
  userLogin: PropTypes.func.isRequired,
  userCreate: PropTypes.func.isRequired,
  userEdit: PropTypes.func.isRequired,
  loginCondition: PropTypes.bool.isRequired,
  setFormError: PropTypes.func.isRequired,
  formError: PropTypes.shape().isRequired,
};

const mapStateToProps = (state) => {
  const { loginCondition, formError } = state;
  return { loginCondition, formError };
};

export default connect(mapStateToProps, {
  userLogin,
  userCreate,
  userEdit,
  setFormError,
})(ProfileForm);
