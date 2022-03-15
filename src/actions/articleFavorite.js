import { blogApi } from '../api/blogApi';

export const articleFavorite = (value, articleSlug) => async () => {
  if (value === 1) {
    blogApi.favoriteArticle(articleSlug);
  } else {
    blogApi.unfavoriteArticle(articleSlug);
  }
};
