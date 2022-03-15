import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

import { Card, Spin, Typography } from 'antd';

import ArtilcePreview from '../../components/article-preview';

import { getCurrentArticle } from '../../actions/getCurrentArticle';
import { setLoadingCondition } from '../../actions/setLoadingCondition';

const SingleArticle = ({ getCurrentArticle, currentArticle }) => {
  const { Paragraph } = Typography;

  const { articleSlug } = useParams();

  useEffect(() => {
    setLoadingCondition(true);
    getCurrentArticle(articleSlug);
  }, []);

  const renderElement =
    Object.keys(currentArticle).length == 0 ? (
      <Spin />
    ) : (
      <Card className="single-article">
        <ArtilcePreview article={currentArticle} isPreview={false} />
        <Paragraph style={{ marginTop: '1rem' }}>
          {currentArticle.body}
        </Paragraph>
      </Card>
    );

  return renderElement;
};

SingleArticle.propTypes = {
  getCurrentArticle: PropTypes.func.isRequired,
  currentArticle: PropTypes.shape(),
};

const mapStateToProps = (state) => {
  const { currentArticle } = state;
  return {
    currentArticle,
  };
};

export default connect(mapStateToProps, {
  getCurrentArticle,
  setLoadingCondition,
})(SingleArticle);
