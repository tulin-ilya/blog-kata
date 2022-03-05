/* eslint-disable no-unused-vars */
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import {
  setLoginCondition,
  setCurrentUser,
} from '../../pages/profile-form/actions';

import { Button, Menu, Dropdown, Avatar, Typography, Space } from 'antd';
import { UserOutlined, EditOutlined, LogoutOutlined } from '@ant-design/icons';

const UserMenu = ({
  loginCondition,
  setLoginCondition,
  setCurrentUser,
  currentUser,
}) => {
  const { Text } = Typography;

  const { username } = currentUser;

  const logout = (key) => {
    if (key.key === 'out') {
      setLoginCondition(false);
      setCurrentUser({});
    }
  };

  const profileMenuItems = (
    <Menu onClick={logout}>
      <Menu.Item key="edit">
        <Link to="/edit-profile">
          <EditOutlined /> Edit profile
        </Link>
      </Menu.Item>
      <Menu.Item key="out">
        <LogoutOutlined /> Log out
      </Menu.Item>
    </Menu>
  );

  const userMenu = loginCondition ? (
    <React.Fragment>
      <Button size="small" className="create-article-button">
        Create article
      </Button>
      <Dropdown overlay={profileMenuItems} className="avatar">
        <Space>
          <Text>{username}</Text>
          <Avatar
            style={{ backgroundColor: '#87d068' }}
            icon={<UserOutlined />}
            size={46}
          />
        </Space>
      </Dropdown>
    </React.Fragment>
  ) : (
    <React.Fragment>
      <Link to="/login">
        <Button type="text" className="sign-in-button">
          Sign In
        </Button>
      </Link>
      <Link to="/registration">
        <Button className="sign-up-button">Sign Up</Button>
      </Link>
    </React.Fragment>
  );

  return <Space size={15}>{userMenu}</Space>;
};

UserMenu.propTypes = {
  loginCondition: PropTypes.bool.isRequired,
  setCurrentUser: PropTypes.func.isRequired,
  setLoginCondition: PropTypes.func.isRequired,
  currentUser: PropTypes.shape().isRequired,
};

const mapStateToProps = (state) => {
  const { loginCondition, currentUser } = state;
  return { loginCondition, currentUser };
};

export default connect(mapStateToProps, {
  setLoginCondition,
  setCurrentUser,
})(UserMenu);
