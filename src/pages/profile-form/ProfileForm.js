/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
// import { Redirect } from 'react-router-dom';

import {
  USER_LOGIN,
  USER_REGISTRATION,
  EDIT_PROFILE,
  fetchUserLogin,
  fetchUserRegistration,
  setFormError,
} from "./actions";

import {
  Card,
  Form,
  Input,
  Checkbox,
  Button,
  Divider,
  Typography,
  message,
} from "antd";

const userNameInput = (formError) => (
  <Form.Item
    label="Username"
    name="username"
    required={false}
    rules={[{ required: true, message: "Please input your Username!" }]}
  >
    <Input placeholder="Username" />
  </Form.Item>
);

const passwordInput = (formError) => (
  <Form.Item
    name="password"
    label="Password"
    required={false}
    validateStatus={formError ? "error" : ""}
    rules={[{ required: true, message: "Please input your password!" }]}
    hasFeedback
  >
    <Input.Password placeholder="Password" />
  </Form.Item>
);

const confirmPasswordInput = (
  <Form.Item
    name="confirm"
    label="Confirm Password"
    required={false}
    dependencies={["password"]}
    hasFeedback
    rules={[
      { required: true, message: "Please confirm your password!" },
      ({ getFieldValue }) => ({
        validator(rule, value) {
          if (!value || getFieldValue("password") === value) {
            return Promise.resolve();
          }
          return Promise.reject(
            new Error("The two passwords that you entered do not match!")
          );
        },
      }),
    ]}
  >
    <Input.Password placeholder="Confirm password" />
  </Form.Item>
);

const emailInput = (formError) => (
  <Form.Item
    label="Email address"
    name="email"
    validateStatus={formError ? "error" : ""}
    required={false}
    rules={[{ required: true, message: "Please input your Email!" }]}
  >
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
            : Promise.reject(new Error("Should accept agreement")),
      },
    ]}
  >
    <Checkbox>I agree to the processing of my personal information</Checkbox>
  </Form.Item>
);

const submitInput = (formCondition) => {
  let value = "";
  switch (formCondition) {
    case USER_LOGIN:
      value = "Login";
      break;
    case USER_REGISTRATION:
      value = "Register";
      break;
    case EDIT_PROFILE:
      value = "Save changes";
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

const registerForm = (formError) => (
  <React.Fragment>
    {userNameInput(formError)}
    {emailInput(formError)}
    {passwordInput(formError)}
    {confirmPasswordInput}
    <Divider />
    {agreeInput}
    {submitInput(USER_REGISTRATION)}
  </React.Fragment>
);

const loginForm = (formError) => (
  <React.Fragment>
    {emailInput(formError)}
    {passwordInput(formError)}
    {submitInput(USER_LOGIN)}
  </React.Fragment>
);

const editForm = (formError) => (
  <React.Fragment>
    {userNameInput(formError)}
    {emailInput(formError)}
    {passwordInput(formError)}
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
    let renderTitle = "";
    let onFinish = () => {};
    switch (pathname) {
      case "/login":
        renderForm = loginForm(formError);
        renderTitle = "Sign In";
        onFinish = (values) => {
          fetchUserLogin(values);
        };
        break;
      case "/registration":
        renderForm = registerForm(formError);
        renderTitle = "Register";
        onFinish = (values) => {
          fetchUserRegistration(values);
        };
        break;
      case "/edit-profile":
        renderForm = editForm(formError);
        renderTitle = "Edit Profile";
    }
    return { renderForm, renderTitle, onFinish };
  };

  useEffect(() => {
    if (formError) {
      message.error(formError);
      setTimeout(() => setFormError(""), 2000);
    }
  }, [formError]);

  useEffect(() => {
    if (loginCondition) {
      navigate("/articles");
    }
  }, [loginCondition]);

  const { renderForm, renderTitle, onFinish } = switchRenderElements(pathname);

  const { Title } = Typography;

  return (
    <Card className="profile-form">
      <Title level={4} style={{ textAlign: "center" }}>
        {renderTitle}
      </Title>
      <Form
        name="profile-form"
        layout="vertical"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
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
