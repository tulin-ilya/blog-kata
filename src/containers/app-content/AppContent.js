import React from 'react';
import { Routes, Route } from 'react-router-dom';

import ArticlesList from '../../pages/articles-list/ArticlesList';
import ProfileForm from '../../pages/profile-form';
import SingleArticle from '../../pages/single-article/SingleArticle';

const AppContent = () => {
  return (
    <Routes>
      <Route path="/" element={<ArticlesList />} />
      <Route path="/articles" element={<ArticlesList />} />
      <Route path="/articles/:articleSlug" element={<SingleArticle />} />
      <Route path="/regisration" element={<ProfileForm />} />
    </Routes>
  );
};

export default AppContent;
