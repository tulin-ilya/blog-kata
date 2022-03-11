import KataBlogService from '../../../serivces/kata-blog-api';

const kataBlogService = new KataBlogService();

export const fetchDeleteArticle = (articleSlug) => async () => {
  const data = await kataBlogService.deleteArticle(articleSlug);
  console.log(data);
};
