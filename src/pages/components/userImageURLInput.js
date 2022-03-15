import React from 'react';
import { Form, Input } from 'antd';

const imageURLConfig = {
  name: 'image',
  label: 'Avatar image (url)',
  rules: [{ type: 'url', message: 'Please input correcet URL-address' }],
};

export const userImageURLInput = () => {
  const config = imageURLConfig;
  return (
    <Form.Item {...config}>
      <Input placeholder="Avatar image" />
    </Form.Item>
  );
};
