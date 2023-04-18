const freshHeaders = () => {
  return {
    headers: {
      'content-type': 'application/json',
      Authorization:
        localStorage.getItem('token'),
    }
  }
}

const config = {
  baseUrl: 'https://api.react-learning.ru/v2/group-10',
  headers: {
    'content-type': 'application/json',
    Authorization:
      localStorage.getItem('token')
  },
  freshHeaders: freshHeaders,
};

const onResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
};

class Api {
  constructor(data) {
    this._baseUrl = data.baseUrl;
    this._headers = data.headers;
    this._freshHeaders = data.freshHeaders;
  }

  getAllPosts() {
    return fetch(`${this._baseUrl}/posts`, {
      ...this._freshHeaders(),
      method: 'GET',
    }).then(onResponse);
  }

  getPostsById(id) {
    return fetch(`${this._baseUrl}/posts/${id}`, {
      ...this._freshHeaders(),
      method: 'GET',
    }).then(onResponse);
  }


  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      ...this._freshHeaders(),
      method: 'GET',
    }).then((res) => onResponse(res));
  }

  updateUserInfo(body) {
    return fetch(`${this._baseUrl}/users/me`, {
      ...this._freshHeaders(),
      method: "PATCH",
      body: JSON.stringify(body),
    }).then(onResponse);
  }

  updateAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      ...this._freshHeaders(),
      method: "PATCH",
      body: JSON.stringify(avatar),
    }).then(onResponse);
  }

  changeLikePostStatus(postId, like) {
    return fetch(`${this._baseUrl}/posts/likes/${postId}`, {
      ...this._freshHeaders(),
      method: like ? 'DELETE' : 'PUT',
    }).then((res) => onResponse(res));
  }

  deletePost(postId) {
    return fetch(`${this._baseUrl}/posts/${postId}`, {
      ...this._freshHeaders(),
      method: 'DELETE',
    }).then((res) => onResponse(res));
  }

  searchPosts(query) {
    return fetch(`${this._baseUrl}/posts/search/?query=${query}`, {
      ...this._freshHeaders(),
      method: 'GET',
    }).then((res) => onResponse(res));
  }

  getUsers() {
    return fetch(`${this._baseUrl}/users`, {
      ...this._freshHeaders(),
      method: 'GET',
    }).then((res) => onResponse(res));
  }

  addComment(postId, body) {
    return fetch(`${this._baseUrl}/posts/comments/${postId}`, {
      ...this._freshHeaders(),
      method: "POST",
      body: JSON.stringify(body)
    }).then((res) => onResponse(res));
  }

  getCommentsPost(postId) {
    return fetch(`${this._baseUrl}/posts/comments/${postId}`, {
      ...this._freshHeaders(),
      method: "GET",
    }).then((res) => onResponse(res));
  }

  deleteComment(postId, commentId) {
    return fetch(`${this._baseUrl}/posts/comments/${postId}/${commentId}`, {
      ...this._freshHeaders(),
      method: "DELETE",
    }).then((res) => onResponse(res));
  }

  createPost(body) {
    return fetch(`${this._baseUrl}/posts`, {
      ...this._freshHeaders(),
      method: 'POST',
      body: JSON.stringify(body),
    }).then(onResponse);
  }

  updatePost(id, body) {
    return fetch(`${this._baseUrl}/posts/${id}`, {
      ...this._freshHeaders(),
      method: 'PATCH',
      body: JSON.stringify(body)
    }).then(onResponse);
  }
}

export const api = new Api(config);