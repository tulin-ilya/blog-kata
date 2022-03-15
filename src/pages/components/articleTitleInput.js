import React from 'react';
import { Form, Input } from 'antd';

export const articleTitleInput = (
  <Form.Item
    label="Title"
    name="title"
    required={false}
    rules={[
      { required: true, message: 'Please input Title!' },
      { max: 40, message: 'Title length must be to 40' },
      { min: 3, message: 'Title length must be from 3' },
    ]}>
    <Input placeholder="Title" showCount maxLength={40} />
  </Form.Item>
);
