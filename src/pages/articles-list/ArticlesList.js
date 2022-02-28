import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Card, List } from 'antd';

import ArtilcePreview from '../../components/article-preview';

import {
  fetchArticles,
  setArticlesOffset,
  setArticlesListPage,
} from './actions';
import { setLoadingCondition } from '../../containers/app/actions';

const ArticlesList = ({
  fetchArticles,
  setArticlesOffset,
  setArticlesListPage,
  articlesList,
  articlesCount,
  articlesOffset,
  articlesListPage,
  loadingCondition,
  setLoadingCondition,
}) => {
  useEffect(() => {
    setLoadingCondition(true);
    fetchArticles();
  }, []);

  useEffect(() => {
    fetchArticles(articlesOffset);
    window.scrollTo(0, 0);
  }, [articlesOffset]);

  const onPageClick = (page) => {
    setArticlesListPage(page);
    const offset = (page - 1) * 20;
    setArticlesOffset(offset);
  };

  return (
    <List
      className="article-list"
      grid={{ column: 1 }}
      loading={loadingCondition}
      itemLayout="vertical"
      dataSource={articlesList}
      pagination={
        !articlesList.length
          ? false
          : {
              pageSize: 20,
              total: articlesCount,
              size: 'small',
              showSizeChanger: false,
              current: articlesListPage,
              style: { textAlign: 'center' },
              onChange: onPageClick,
            }
      }
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
  articlesList: PropTypes.array.isRequired,
  articlesCount: PropTypes.number.isRequired,
  articlesOffset: PropTypes.number.isRequired,
  articlesListPage: PropTypes.number.isRequired,
  setArticlesListPage: PropTypes.func.isRequired,
  loadingCondition: PropTypes.bool.isRequired,
  setLoadingCondition: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const {
    articlesList,
    articlesCount,
    articlesOffset,
    articlesListPage,
    loadingCondition,
  } = state;
  return {
    articlesList,
    articlesCount,
    articlesOffset,
    articlesListPage,
    loadingCondition,
  };
};

export default connect(mapStateToProps, {
  fetchArticles,
  setArticlesOffset,
  setArticlesListPage,
  setLoadingCondition,
})(ArticlesList);
