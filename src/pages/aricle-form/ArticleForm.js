/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Card, Form, Typography } from 'antd';

import { fetchNewArticle, fetchEditArticle } from './actions';
import { fetchCurrentArticle } from '../single-article/actions';

import {
  titleInput,
  descriptionInput,
  bodyInput,
  submitInput,
  tagListInput,
} from './inputs';

const tagList = ['tag1', 'tag2'];

const ArticleForm = ({
  loginCondition,
  fetchNewArticle,
  currentArticle,
  fetchEditArticle,
}) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const onFinish = (values) => {
    return pathname.includes('edit')
      ? fetchNewArticle(values)
      : fetchEditArticle(currentArticle.slug, values);
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
        fields={[
          { name: ['tagList'], value: tagList },
          { name: ['title'], value: currentArticle.title },
          { name: ['description'], value: currentArticle.description },
          { name: ['body'], value: currentArticle.body },
          { name: ['tagList'], value: currentArticle.tagList },
        ]}>
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
  fetchCurrentArticle: PropTypes.func.isRequired,
  currentArticle: PropTypes.shape().isRequired,
};

const mapStateToProps = (state) => {
  const { loginCondition, currentArticle } = state;
  return { loginCondition, currentArticle };
};

export default connect(mapStateToProps, {
  fetchNewArticle,
  fetchEditArticle,
  fetchCurrentArticle,
})(ArticleForm);
