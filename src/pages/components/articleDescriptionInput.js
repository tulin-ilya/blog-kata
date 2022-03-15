import React from 'react';
import { Form, Input } from 'antd';

export const articleDescriptionInput = (
  <Form.Item
    label="Short description"
    name="description"
    required={false}
    rules={[
      { required: true, message: 'Please input Description!' },
      { max: 150, message: 'Description length must be to 150' },
      { min: 3, message: 'Description length must be from 3' },
    ]}>
    <Input placeholder="Short description" showCount maxLength={150} />
  </Form.Item>
);
