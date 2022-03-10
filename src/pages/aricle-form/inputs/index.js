import React from 'react';
import { Form, Input, Button, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

export const titleInput = (
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

export const descriptionInput = (
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

export const bodyInput = (
  <Form.Item name="body" label="Text">
    <Input.TextArea showCount rows={10} placeholder="Text" />
  </Form.Item>
);

export const submitInput = (
  <Button type="primary" htmlType="submit">
    Send
  </Button>
);

export const tagListInput = (
  <Form.Item label="Tags" rules={[{ required: true, message: 'Missing tag' }]}>
    <Form.List name="tagList">
      {(fields, operation, meta) => {
        return tagField(fields, operation, meta);
      }}
    </Form.List>
  </Form.Item>
);

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
        <Button
          type="dashed"
          onClick={() => add()}
          block
          icon={<PlusOutlined />}>
          Add tag
        </Button>
      </Form.Item>
    </>
  );
};
