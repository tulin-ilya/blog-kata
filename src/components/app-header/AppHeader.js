import React from 'react';

import { Typography } from 'antd';

import UserMenu from '../user-menu/UserMenu';

const AppHeader = () => {
  const { Text } = Typography;
  return (
    <React.Fragment>
      <Text strong>Realworld Blog</Text>
      <UserMenu />
    </React.Fragment>
  );
};

export default AppHeader;
