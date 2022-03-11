import KataBlogService from '../../../serivces/kata-blog-api';

const kataBlogService = new KataBlogService();

export const fetchDeleteArticle = (articleSlug) => async () => {
  const data = await kataBlogService.deleteArticle(articleSlug);
  console.log(data);
};

export const fetchFavoriteArticle = (value, articleSlug) => async () => {
  if (value === 1) {
    kataBlogService.favoriteArticle(articleSlug);
  } else {
    kataBlogService.unfavoriteArticle(articleSlug);
  }
};
