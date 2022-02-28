/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';

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
    favorited,
  } = article;
  const { username, image } = author;

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
              renderItem={(tag) => <Tag>{tag}</Tag>}></List>
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
      </Row>
    </React.Fragment>
  );
};

export default ArtilcePreview;
