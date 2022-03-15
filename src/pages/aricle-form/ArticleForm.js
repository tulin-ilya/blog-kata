import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Card, Form, Typography } from 'antd';

import { articleCreate } from '../../actions/articleCreate';
import { articleEdit } from '../../actions/articleEdit';

import { articleBodyInput } from '../components/articleBodyInput';
import { articleDescriptionInput } from '../components/articleDescriptionInput';
import { articleSubmitInput } from '../components/articleSubmitInput';
import { articleTagListInput } from '../components/articleTagListInput';
import { articleTitleInput } from '../components/articleTitleInput';

const ArticleForm = ({
  loginCondition,
  articleCreate,
  currentArticle,
  articleEdit,
}) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const onFinish = (values) => {
    if (!pathname.includes('edit')) {
      articleCreate(values);
      navigate('/articles');
    } else {
      articleEdit(currentArticle.slug, values);
      navigate(`/articles/${currentArticle.slug}`);
    }
  };

  useEffect(() => {
    if (!loginCondition) {
      navigate('/login');
    }
  });

  const { Title } = Typography;

  return (
    <Card className="article-form">
      <Title level={4} style={{ textAlign: 'center' }}>
        {!pathname.includes('edit') ? 'Create new article' : 'Edit article'}
      </Title>
      <Form
        name="article-form"
        layout="vertical"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        fields={[
          { name: ['tagList'], value: currentArticle.tagList },
          { name: ['title'], value: currentArticle.title },
          { name: ['description'], value: currentArticle.description },
          { name: ['body'], value: currentArticle.body },
          { name: ['tagList'], value: currentArticle.tagList },
        ]}>
        {articleTitleInput}
        {articleDescriptionInput}
        {articleBodyInput}
        {articleTagListInput}
        {articleSubmitInput}
      </Form>
    </Card>
  );
};

ArticleForm.propTypes = {
  loginCondition: PropTypes.bool.isRequired,
  articleCreate: PropTypes.func.isRequired,
  articleEdit: PropTypes.func.isRequired,
  currentArticle: PropTypes.shape().isRequired,
};

const mapStateToProps = (state) => {
  const { loginCondition, currentArticle } = state;
  return { loginCondition, currentArticle };
};

export default connect(mapStateToProps, {
  articleCreate,
  articleEdit,
})(ArticleForm);
