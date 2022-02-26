import React from 'react';

import { Typography } from 'antd';

const AppFooter = () => {
  const { Text, Link } = Typography;
  return (
    <Text type="secondary">
      Created by{' '}
      <Link href="https://github.com/tulin-ilya/" target="_blank">
        Ilya Tulin
      </Link>
    </Text>
  );
};

export default AppFooter;
