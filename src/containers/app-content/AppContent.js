import React from 'react';
import { Routes, Route } from 'react-router-dom';

import ArticlesList from '../../pages/articles-list/ArticlesList';
import ProfileForm from '../../pages/profile-form';

const AppContent = () => {
  return (
    <Routes>
      <Route path="/" element={<ArticlesList />}>
        <Route path="articles" element={<ArticlesList />} />
      </Route>
      <Route path="/regisration" element={<ProfileForm />} />
    </Routes>
  );
};

export default AppContent;
