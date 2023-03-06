const config = {
    baseUrl: 'https://api.react-learning.ru/v2/group-10',
    headers: {
        'content-type': 'application/json',
        Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2VkNTI3NzU5Yjk4YjAzOGY3N2I2N2YiLCJncm91cCI6Imdyb3VwLTEwIiwiaWF0IjoxNjc2ODM3NTAyLCJleHAiOjE3MDgzNzM1MDJ9.VNrRedalnQcsqlCUxhZ91KRSfm2nGeDNvhYlHshirrk'
    },
};

const onResponse = (res) => {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
};

class Api {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    getAllPosts() {
        return fetch(`${this._baseUrl}/posts`, {
            headers: this._headers,
            method: 'GET',
        }).then(onResponse);
    }

    getPostsById(id) {
        return fetch(`${this._baseUrl}/posts/${id}`, {
            headers: this._headers,
            method: 'GET',
        }).then(onResponse);
    }

    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers,
            method: 'GET',
        }).then((res) => onResponse(res));
    }
    
    changeLikePostStatus(postId, like) {
        return fetch(`${this._baseUrl}/posts/likes/${postId}`, {
            headers: this._headers,
            method: like ? 'DELETE' : 'PUT',
        }).then((res) => onResponse(res));
    }

    deletePost(postId) {
        return fetch(`${this._baseUrl}/posts/${postId}`,{
            headers: this._headers,
            method: 'DELETE',
        }).then((res) => onResponse(res));
    }

    searchPosts(query) {
        return fetch(`${this._baseUrl}/posts/search/?query=${query}`, {
            headers: this._headers,
            method: 'GET',
        }).then((res) => onResponse(res));
    }
}

export const api = new Api(config);