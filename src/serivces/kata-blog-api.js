/* eslint-disable no-unused-vars */
const CREATE_USER = 'CREATE_USER';
const LOGIN = 'LOGIN';
const GET_CURRENT_USER = 'GET_CURRENT_USER';
const UPD_CURRENT_USER = 'UPD_CURRENT_USER';

const GET_ARTICLES = 'GET_ARTICLES';
const GET_ARTICLE = 'GET_ARTICLE';
const CREATE_NEW_ARTICLE = 'CREATE_NEW_ARTICLE';
const UPD_ARTICLE = 'UPD_ARTICLE';
const GET_TAGS = 'GET_TAGS';

const FAVORITE_AN_ARTICLE = 'FAVORITE_AN_ARTICLE';
const UNFAVORITE_AN_ARTICLE = 'UNFAVORITE_AN_ARTICLE';

const GET = 'GET';
const POST = 'POST';
const PUT = 'PUT';
const DELETE = 'DELETE';

export default class KataBlogService {
  _apiBase = 'https://kata.academy:8021/api';

  setQueryUrl(queryPath, articleSlug) {
    let url = '';
    switch (queryPath) {
      case CREATE_USER:
        url = `${this._apiBase}/users`;
        break;
      case LOGIN:
        url = `${this._apiBase}/users/login`;
        break;
      case GET_CURRENT_USER:
      case UPD_CURRENT_USER:
        url = `${this._apiBase}/user`;
        break;
      case GET_ARTICLES:
      case CREATE_NEW_ARTICLE:
        url = `${this._apiBase}/articles`;
        break;
      case GET_ARTICLE:
      case UPD_ARTICLE:
        url = `${this._apiBase}/articles/${articleSlug}`;
        break;
      case GET_TAGS:
        url = `${this._apiBase}/tags`;
        break;
      case FAVORITE_AN_ARTICLE:
      case UNFAVORITE_AN_ARTICLE:
        url = `${this._apiBase}/articles/${articleSlug}/favorite`;
        break;
      default:
        url = `${this._apiBase}/articles`;
    }
    return url;
  }

  async getResponse(queryPath, queryOptions) {
    const url = this.setQueryUrl(queryPath, queryOptions.articleSlug);
    const headers = { 'Content-type': 'application/json' };
    let body;
    let response;

    switch (queryOptions.requestType) {
      case GET:
        response = await fetch(url);
        break;
      case POST:
        body = JSON.stringify(queryOptions.requestBody);
        response = await fetch(url, {
          method: POST,
          body,
          headers,
        });
        break;
      case PUT:
        body = JSON.stringify(queryOptions.requestBody);
        response = await fetch(url, {
          method: PUT,
          body,
          headers,
        });
        break;
      case DELETE:
        response = await fetch(url, {
          method: DELETE,
        });
        break;
      default:
        response = await fetch(url);
    }

    if (!response.ok) {
      throw new Error(
        `${response.status}-${response.statusText || '(no message)'} on ${
          response.url
        }`
      );
    }
    return await response.json();
  }

  async createUser(username, email, password) {
    const queryOptions = {
      requestType: POST,
      requestBody: {
        user: { username, email, password },
      },
    };
    const response = await this.getResponse(CREATE_USER, queryOptions);
    return await response;
  }

  async login(email, password) {
    const queryOptions = {
      requestType: POST,
      requestBody: {
        user: { email, password },
      },
    };
    const response = await this.getResponse(LOGIN, queryOptions);
    return await response;
  }

  async getCurrentUser() {
    const response = await this.getResponse(GET_CURRENT_USER, {
      requestType: GET,
    });
    return await response;
  }

  async updCurrentUser(
    email = null,
    username = null,
    bio = null,
    image = null
  ) {
    const initialValues = await this.getCurrentUser();
    const { initEmail, initUsername, initBio, initImage } = initialValues.user;
    const queryOptions = {
      requestType: PUT,
      requestBody: {
        user: {
          email: email || initEmail,
          username: username || initUsername,
          bio: bio || initBio,
          image: image || initImage,
        },
      },
    };
    const response = await this.getResponse(UPD_CURRENT_USER, queryOptions);
    return await response;
  }

  async getArticles() {
    const response = await this.getResponse(GET_ARTICLES, { requestType: GET });
    return await response.articles;
  }

  async getArticle(articleSlug) {
    const response = await this.getResponse(GET_ARTICLE, {
      requestType: GET,
      articleSlug,
    });
    return await response;
  }

  async createNewArticle(title, descripton, body, tagList) {
    const queryOptions = {
      requestType: POST,
      requestBody: { article: { title, descripton, body, tagList } },
    };
    const response = await this.getResponse(CREATE_NEW_ARTICLE, queryOptions);
    return await response;
  }

  async updArticle(articleSlug, title = null, description = null, body = null) {
    const initialllValue = await this.getArticle(articleSlug);
    const { initTitle, initDescription, initBody } = initialllValue.article;
    const queryOptions = {
      requestType: PUT,
      requestBody: {
        article: {
          title: title || initTitle,
          description: description || initDescription,
          body: body || initBody,
        },
      },
    };
    const responce = await this.getResponse(UPD_ARTICLE, queryOptions);
    return await responce;
  }

  async getTags() {
    const responce = await this.getResponse(GET_TAGS);
    return await responce;
  }

  async favoriteArticle(articleSlug) {
    const queryOptions = {
      requestType: POST,
      articleSlug,
    };
    const responce = await this.getResponse(FAVORITE_AN_ARTICLE, queryOptions);
    return await responce;
  }

  async unfavoriteArticle(articleSlug) {
    const queryOptions = {
      requestType: DELETE,
      articleSlug,
    };
    const responce = await this.getResponse(
      UNFAVORITE_AN_ARTICLE,
      queryOptions
    );
    return await responce;
  }
}

const options = {
  requestType: 'string',
  articleSlug: 'string',
  requestBody: {
    user: {
      username: 'string',
      email: 'string',
      password: 'string',
      token: 'string',
      bio: 'string',
      image: 'string',
    },
    article: {
      slug: 'string',
      title: 'string',
      description: 'string',
      body: 'string',
      tagList: ['string'],
      createdAt: 'string',
      updatedAt: 'string',
      favorited: 'bool',
      favoritesCount: 'number',
      author: {
        username: 'string',
        bio: 'string',
        image: 'string',
        following: 'bool',
      },
    },
  },
};
