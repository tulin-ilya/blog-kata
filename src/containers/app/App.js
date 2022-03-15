import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { Layout } from 'antd';

import AppHeader from '../../components/app-header';
import AppContent from '../app-content';
import AppFooter from '../../components/app-footer';

const App = () => {
  const { Header, Content, Footer } = Layout;
  return (
    <BrowserRouter>
      <Layout className="blog">
        <Header className="blog__header header">
          <AppHeader />
        </Header>
        <Content className="blog__content content">
          <AppContent />
        </Content>
        <Footer className="blog__footer footer">
          <AppFooter />
        </Footer>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
