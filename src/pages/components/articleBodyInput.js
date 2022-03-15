import React from 'react';
import { Form, Input } from 'antd';

export const articleBodyInput = (
  <Form.Item name="body" label="Text">
    <Input.TextArea showCount rows={10} placeholder="Text" />
  </Form.Item>
);
