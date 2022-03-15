import React from 'react';
import { Form, Checkbox } from 'antd';

export const userAgreeInput = (
  <Form.Item
    name="agreement"
    valuePropName="checked"
    rules={[
      {
        validator: (rule, value) =>
          value
            ? Promise.resolve()
            : Promise.reject(new Error('Should accept agreement')),
      },
    ]}>
    <Checkbox>I agree to the processing of my personal information</Checkbox>
  </Form.Item>
);
