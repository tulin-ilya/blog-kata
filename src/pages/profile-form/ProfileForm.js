/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import {
  USER_LOGIN,
  USER_REGISTRATION,
  EDIT_PROFILE,
  fetchUserLogin,
  fetchUserRegistration,
  setFormError,
} from "./actions";

import { Card, Form, Input, Checkbox, Button, Divider, Typography } from "antd";

const userNameInput = (formError, currentUser) => (
  <Form.Item
    label="Username"
    name="username"
    value={currentUser.username}
    required={false}
    validateStatus={formError.username ? "error" : ""}
    help={formError.username || ""}
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
    validateStatus={
      formError.password || formError["email or password"] ? "error" : ""
    }
    help={formError.password}
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

const emailInput = (formError, currentUser) => (
  <Form.Item
    label="Email address"
    name="email"
    value={currentUser.email}
    validateStatus={
      formError.email || formError["email or password"] ? "error" : ""
    }
    help={formError.email}
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

const registerForm = (formError, currentUser) => (
  <React.Fragment>
    {userNameInput(formError, currentUser)}
    {emailInput(formError, currentUser)}
    {passwordInput(formError)}
    {confirmPasswordInput}
    <Divider />
    {agreeInput}
    {submitInput(USER_REGISTRATION)}
  </React.Fragment>
);

const loginForm = (formError, currentUser) => (
  <React.Fragment>
    {emailInput(formError, currentUser)}
    {passwordInput(formError)}
    {submitInput(USER_LOGIN)}
  </React.Fragment>
);

const editForm = (formError, currentUser) => (
  <React.Fragment>
    {userNameInput(formError, currentUser)}
    {emailInput(formError, currentUser)}
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
  currentUser,
}) => {
  console.log(currentUser);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const switchRenderElements = (pathname, currentUser) => {
    let renderForm = null;
    let renderTitle = "";
    let onFinish = () => {};
    switch (pathname) {
      case "/login":
        renderForm = loginForm(formError, currentUser);
        renderTitle = "Sign In";
        onFinish = (values) => {
          fetchUserLogin(values);
        };
        break;
      case "/registration":
        renderForm = registerForm(formError, currentUser);
        renderTitle = "Register";
        onFinish = (values) => {
          fetchUserRegistration(values);
        };
        break;
      case "/edit-profile":
        renderForm = editForm(formError, currentUser);
        renderTitle = "Edit Profile";
    }
    return { renderForm, renderTitle, onFinish };
  };

  useEffect(() => {
    if (formError) {
      setTimeout(() => setFormError({}), 5000);
    }
  }, [formError]);

  useEffect(() => {
    if (loginCondition && pathname != "/edit-profile") {
      navigate("/articles");
    }
  }, [loginCondition]);

  const { renderForm, renderTitle, onFinish } = switchRenderElements(
    pathname,
    currentUser
  );

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
