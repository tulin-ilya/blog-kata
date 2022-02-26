import React from 'react';

import { Card, List } from 'antd';

import ArtilcePreview from '../../components/article-preview';

import articlesBody from '../../articles';

const ArticlesList = () => {
  const { articles, articlesCount } = articlesBody;

  const onPageClick = (page) => {
    const offset = (page - 1) * 20;
    console.log(offset);
  };

  return (
    <List
      size="small"
      itemLayout="vertical"
      dataSource={articles}
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

export default ArticlesList;
