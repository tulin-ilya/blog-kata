/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';

import {
  Col,
  List,
  Rate,
  Row,
  Tag,
  Space,
  Typography,
  Avatar,
  Tooltip,
  Button,
} from 'antd';
import { HeartFilled } from '@ant-design/icons';

const ArtilcePreview = ({ article, isPreview }) => {
  const {
    slug,
    title,
    favoritesCount,
    tagList,
    author,
    createdAt,
    description,
  } = article;
  const { username, image } = author;

  const { pathname } = useLocation();
  const { username: currentUserName } = JSON.parse(
    localStorage.getItem('currentUser')
  );

  const { Text, Paragraph, Title } = Typography;
  return (
    <React.Fragment>
      <Row justify="space-between" wrap={false}>
        <Space direction="vertical" style={{ maxWidth: '75%' }}>
          <Space>
            <Tooltip title={title}>
              <Link to={`/articles/${slug}`}>
                <Title
                  style={{ marginBottom: 0, overflow: 'hidden' }}
                  level={4}>
                  {title.length < 35 ? title : `${title.slice(0, 34)}...`}
                </Title>
              </Link>
            </Tooltip>
            <span>
              <Rate
                count={1}
                style={{ color: '#FF0707' }}
                character={<HeartFilled />}
              />
              <Text type="secondary" className="ant-rate-text">
                {favoritesCount}
              </Text>
            </span>
          </Space>
          {tagList.length ? (
            <List
              itemLayout="horizontal"
              dataSource={tagList}
              renderItem={(tag) => (
                <Tooltip title={tag}>
                  <Tag>{tag.length < 10 ? tag : `${tag.slice(0, 9)}...`}</Tag>
                </Tooltip>
              )}></List>
          ) : null}
          <Tooltip title={description} placement="bottom">
            <Paragraph
              style={{ marginBottom: 0 }}
              ellipsis={{ rows: 2 }}
              type={!isPreview ? 'secondary' : ''}>
              {description}
            </Paragraph>
          </Tooltip>
        </Space>
        <Space direction="vertical">
          <Space align="middle">
            <Col
              style={{
                display: 'flex',
                alignItems: 'end',
                flexDirection: 'column',
              }}>
              <Text strong>{username}</Text>
              <Text type="secondary">{createdAt}</Text>
            </Col>
            <Col>
              <Avatar size={46} src={image} />
            </Col>
          </Space>
          {pathname === `/articles/${slug}` && currentUserName === username ? (
            <Space>
              <Button className="sign-in-button">Edit</Button>
              <Button className="sign-in-button">Delete</Button>
            </Space>
          ) : null}
        </Space>
      </Row>
    </React.Fragment>
  );
};

ArtilcePreview.propTypes = {
  article: PropTypes.shape().isRequired,
  isPreview: PropTypes.bool.isRequired,
};

export default ArtilcePreview;
