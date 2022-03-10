/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Card, Form, Typography } from 'antd';

import { fetchNewArticle, fetchEditArticle } from './actions';

import {
  titleInput,
  descriptionInput,
  bodyInput,
  submitInput,
  tagListInput,
} from './inputs';

const tagList = ['tag1', 'tag2'];

const ArticleForm = ({ loginCondition, fetchNewArticle, fetchEditArticle }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const onFinish = (values) => {
    fetchNewArticle(values);
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
  fetchNewArticle: PropTypes.func.isRequired,
  fetchEditArticle: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const { loginCondition } = state;
  return { loginCondition };
};

export default connect(mapStateToProps, { fetchNewArticle, fetchEditArticle })(
  ArticleForm
);
