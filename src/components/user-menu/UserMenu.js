/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';

import { Button, Menu, Dropdown, Avatar, Typography, Space } from 'antd';
import { UserOutlined, EditOutlined, LogoutOutlined } from '@ant-design/icons';

const UserMenu = () => {
  const logIn = false;

  const { Text } = Typography;

  const profileMenuItems = (
    <Menu>
      <Menu.Item key="edit">
        <EditOutlined /> Edit profile
      </Menu.Item>
      <Menu.Item key="out">
        <LogoutOutlined /> Log out
      </Menu.Item>
    </Menu>
  );

  const userMenu = logIn ? (
    <React.Fragment>
      <Button size="small" className="create-article-button">
        Create article
      </Button>
      <Dropdown overlay={profileMenuItems} className="avatar">
        <Space>
          <Text>Ilya Tulin</Text>
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

export default UserMenu;
