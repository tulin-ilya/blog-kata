import React from 'react';
import { Link } from 'react-router-dom';

import { Typography } from 'antd';

import UserMenu from '../user-menu/UserMenu';

const AppHeader = () => {
  const { Text } = Typography;
  return (
    <React.Fragment>
      <Link to="/">
        <Text strong>Realworld Blog</Text>
      </Link>

      <UserMenu />
    </React.Fragment>
  );
};

export default AppHeader;
