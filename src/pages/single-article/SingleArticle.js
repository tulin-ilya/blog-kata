import React from 'react';

import { Card, Typography } from 'antd';
import ArtilcePreview from '../../components/article-preview';

import articlesBody from '../../articles';

const SingleArticle = () => {
  const { Paragraph } = Typography;
  const { articles } = articlesBody;
  const article = articles[15];
  return (
    <Card
      className="article-preview"
      style={{ alignSelf: 'stretch', flexGrow: 1 }}>
      <ArtilcePreview article={article} isPreview={false} />
      <Paragraph style={{ marginTop: '1rem' }}>{article.body}</Paragraph>
    </Card>
  );
};

export default SingleArticle;
