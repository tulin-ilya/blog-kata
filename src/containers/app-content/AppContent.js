import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ArticleForm from '../../pages/aricle-form/ArticleForm';

import ArticlesList from '../../pages/articles-list/ArticlesList';
import ProfileForm from '../../pages/profile-form';
import SingleArticle from '../../pages/single-article/SingleArticle';

const AppContent = () => {
  return (
    <Routes>
      <Route path="/" element={<ArticlesList />} />
      <Route path="/articles/" element={<ArticlesList />} />
      <Route path="/articles/:articleSlug" element={<SingleArticle />} />
      <Route path="/registration" element={<ProfileForm />} />
      <Route path="/login" element={<ProfileForm />} />
      <Route path="/edit-profile" element={<ProfileForm />} />
      <Route path="/new-article" element={<ArticleForm />} />
    </Routes>
  );
};

export default AppContent;
