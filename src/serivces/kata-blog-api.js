const CREATE_USER = 'CREATE_USER';
const LOGIN = 'LOGIN';
const GET_CURRENT_USER = 'GET_CURRENT_USER';
const UPD_CURRENT_USER = 'UPD_CURRENT_USER';

const GET_ARTICLES = 'GET_ARTICLES';
const GET_ARTICLE = 'GET_ARTICLE';
const CREATE_NEW_ARTICLE = 'CREATE_NEW_ARTICLE';
const UPD_ARTICLE = 'UPD_ARTICLE';
const DELETE_ARTICLE = 'DELETE_ARTICLE';
const GET_TAGS = 'GET_TAGS';

const FAVORITE_AN_ARTICLE = 'FAVORITE_AN_ARTICLE';
const UNFAVORITE_AN_ARTICLE = 'UNFAVORITE_AN_ARTICLE';

const GET = 'GET';
const POST = 'POST';
const PUT = 'PUT';
const DELETE = 'DELETE';

export default class KataBlogService {
  _apiBase = 'https://kata.academy:8021/api';
  _token = localStorage.getItem('token');

  setQueryUrl(queryPath, queryOptions) {
    const { articleSlug, offset } = queryOptions;
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
        url = `${this._apiBase}/articles?offset=${offset}`;
        break;
      case CREATE_NEW_ARTICLE:
        url = `${this._apiBase}/articles`;
        break;
      case GET_ARTICLE:
      case UPD_ARTICLE:
      case DELETE_ARTICLE:
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
    const url = this.setQueryUrl(queryPath, queryOptions);
    const headers = {
      'Content-type': 'application/json',
      accept: 'application/json',
      Authorization: `Bearer ${this._token}`,
    };
    let body;
    let response;

    switch (queryOptions.requestType) {
      case GET:
        response = await fetch(url, { method: GET, headers });
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
          headers,
        });
        break;
    }
    const result = await response.json();

    if (result.errors) {
      return result;
    }

    if (!response.ok) {
      throw new Error(
        `${response.status}-${response.statusText || '(no message)'} on ${
          response.url
        }`
      );
    }

    return result;
  }

  _setCurrentUserToLS(currentUser) {
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    localStorage.setItem('token', currentUser.token);
  }

  async createUser(username, email, password) {
    const queryOptions = {
      requestType: POST,
      requestBody: {
        user: { username, email, password },
      },
    };
    const response = await this.getResponse(CREATE_USER, queryOptions);
    this._setCurrentUserToLS(response.user);
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
    if (response.user) {
      this._setCurrentUserToLS(response.user);
    }
    return await response;
  }

  async getCurrentUser() {
    const response = await this.getResponse(GET_CURRENT_USER, {
      requestType: GET,
    });
    return await response;
  }

  async updCurrentUser(email = null, username = null, image = null, password) {
    const queryOptions = {
      requestType: PUT,
      requestBody: {
        user: {
          email,
          username,
          image,
          password,
        },
      },
    };
    const response = await this.getResponse(UPD_CURRENT_USER, queryOptions);
    if (response.user) {
      this._setCurrentUserToLS(response.user);
    }
    return await response;
  }

  async getArticles(offset = 0) {
    const response = await this.getResponse(GET_ARTICLES, {
      requestType: GET,
      offset,
    });
    return await response;
  }

  async getArticle(articleSlug) {
    const response = await this.getResponse(GET_ARTICLE, {
      requestType: GET,
      articleSlug,
    });
    return await response;
  }

  async createNewArticle(title, description, body, tagList) {
    const queryOptions = {
      requestType: POST,
      requestBody: { article: { title, description, body, tagList } },
    };
    const response = await this.getResponse(CREATE_NEW_ARTICLE, queryOptions);
    return await response;
  }

  async updArticle(articleSlug, title, description, body) {
    const queryOptions = {
      requestType: PUT,
      articleSlug,
      requestBody: {
        article: {
          title: title,
          description: description,
          body: body,
        },
      },
    };
    const responce = await this.getResponse(UPD_ARTICLE, queryOptions);
    return await responce;
  }

  async deleteArticle(articleSlug) {
    const response = await this.getResponse(DELETE_ARTICLE, {
      requestType: DELETE,
      articleSlug,
    });
    return await response;
  }

  async getTags() {
    const responce = await this.getResponse(GET_TAGS);
    return await responce;
  }

  async favoriteArticle(articleSlug) {
    console.log(articleSlug);
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
