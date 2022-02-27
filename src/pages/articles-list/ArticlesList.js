/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Card, List } from 'antd';

import ArtilcePreview from '../../components/article-preview';

import { fetchArticles, setArticlesOffset } from './actions';

const ArticlesList = ({ fetchArticles, setArticlesOffset, state }) => {
  const { articlesList, articlesCount, articlesOffset } = state;

  useEffect(() => {
    fetchArticles();
  }, []);

  useEffect(() => {
    fetchArticles(articlesOffset);
    window.scrollTo(0, 0);
  }, [articlesOffset]);

  const onPageClick = (page) => {
    const offset = (page - 1) * 20;
    setArticlesOffset(offset);
  };

  return (
    <List
      grid={{ column: 1 }}
      itemLayout="vertical"
      dataSource={articlesList}
      pagination={{
        pageSize: 20,
        total: articlesCount,
        size: 'small',
        showSizeChanger: false,
        style: { textAlign: 'center' },
        onChange: onPageClick,
      }}
      renderItem={(article) => {
        return (
          <List.Item key={article.slug}>
            <Card className="article-preview">
              <ArtilcePreview article={article} isPreview={true} />
            </Card>
          </List.Item>
        );
      }}></List>
  );
};

ArticlesList.propTypes = {
  fetchArticles: PropTypes.func.isRequired,
  setArticlesOffset: PropTypes.func.isRequired,
  state: PropTypes.shape().isRequired,
};

const mapStateToProps = (state) => {
  return {
    state,
  };
};

export default connect(mapStateToProps, {
  fetchArticles,
  setArticlesOffset,
})(ArticlesList);
