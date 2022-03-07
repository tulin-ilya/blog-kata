/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { setLoginCondition } from '../../pages/profile-form/actions';

import { Button, Menu, Dropdown, Avatar, Typography, Space } from 'antd';
import { UserOutlined, EditOutlined, LogoutOutlined } from '@ant-design/icons';

const UserMenu = ({ setLoginCondition, loginCondition }) => {
  const { Text } = Typography;

  const { username, image } =
    JSON.parse(localStorage.getItem('currentUser')) || {};

  const logout = (key) => {
    if (key.key === 'out') {
      localStorage.removeItem('currentUser');
      localStorage.removeItem('token');
      setLoginCondition(false);
    }
  };

  useEffect(() => {
    if (username && !loginCondition) {
      setLoginCondition(true);
    }
  });

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
            src={image}
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
  setLoginCondition: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const { loginCondition } = state;
  return { loginCondition };
};

export default connect(mapStateToProps, {
  setLoginCondition,
})(UserMenu);
