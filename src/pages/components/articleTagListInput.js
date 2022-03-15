import React from 'react';
import { Form, Input, Button, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const tagField = (fields, { add, remove }) => {
  return (
    <>
      {fields.map(({ key, name, ...restField }) => {
        return (
          <Space key={key} style={{ display: 'flex' }} align="baseline">
            <Form.Item
              key={key}
              name={name}
              {...restField}
              rules={[
                { required: true, message: 'Missing tag' },
                { max: 10, message: 'Tag length must be to 10' },
              ]}>
              <Input placeholder="Tag" />
            </Form.Item>
            <MinusCircleOutlined onClick={() => remove(name)} />
          </Space>
        );
      })}
      <Form.Item>
        <Button type="dashed" onClick={() => add()} icon={<PlusOutlined />}>
          Add tag
        </Button>
      </Form.Item>
    </>
  );
};

export const articleTagListInput = (
  <Form.Item label="Tags">
    <Form.List name="tagList">
      {(fields, operation) => {
        return tagField(fields, operation);
      }}
    </Form.List>
  </Form.Item>
);
