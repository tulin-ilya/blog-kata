/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Card, Form, Typography } from 'antd';

import {
  titleInput,
  descriptionInput,
  bodyInput,
  submitInput,
  tagListInput,
  tagField,
} from './inputs';

const tagList = ['tag1', 'tag2'];

const ArticleForm = ({ loginCondition }) => {
  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log(values);
  };

  useEffect(() => {
    if (!loginCondition) {
      navigate('/articles');
    }
  });

  const { Title } = Typography;

  return (
    <Card className="article-form">
      <Title level={4} style={{ textAlign: 'center' }}>
        Create new article
      </Title>
      <Form
        name="article-form"
        layout="vertical"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        fields={[{ name: ['tagList'], value: tagList }]}>
        {titleInput}
        {descriptionInput}
        {bodyInput}
        {tagListInput}
        {submitInput}
      </Form>
    </Card>
  );
};

ArticleForm.propTypes = {
  loginCondition: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  const { loginCondition } = state;
  return { loginCondition };
};

export default connect(mapStateToProps)(ArticleForm);
