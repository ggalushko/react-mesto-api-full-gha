class Api {
  constructor(options) {
    this._options = options;
  }

  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка ${res.status}`);
  }

  async getInitialCards() {
    const res = await fetch(`${this._options.baseURL}/cards`, {
      headers: {
        ...this._options.headers,
      },
    });
    return this._checkResponse(res);
  }

  async addCard(name, link) {
    const res = await fetch(`${this._options.baseURL}/cards`, {
      method: "POST",
      headers: {
        ...this._options.headers,
      },
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    });
    return this._checkResponse(res);
  }

  async getUserData() {
    const res = await fetch(`${this._options.baseURL}/users/me `, {
      headers: {
        ...this._options.headers,
      },
    });
    return this._checkResponse(res);
  }

  async editProfile({ name, about }) {
    const res = await fetch(`${this._options.baseURL}/users/me `, {
      method: "PATCH",
      headers: {
        ...this._options.headers,
      },
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    });
    return this._checkResponse(res);
  }

  async deleteCard(id) {
    const res = await fetch(`${this._options.baseURL}/cards/${id}`, {
      method: "DELETE",
      headers: {
        ...this._options.headers,
      },
    });
    return this._checkResponse(res);
  }


  async addLike(id) {
    const res = await fetch(`${this._options.baseURL}/cards/${id}/likes`, {
      method: "PUT",
      headers: {
        ...this._options.headers,
      },
    });
    return this._checkResponse(res);
  }

  async removeLike(id) {
    const res = await fetch(`${this._options.baseURL}/cards/${id}/likes`, {
      method: "DELETE",
      headers: {
        ...this._options.headers,
      },
    });
    return this._checkResponse(res);
  }

  async changeAvatar(imageURL) {
    const res = await fetch(`${this._options.baseURL}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        ...this._options.headers,
      },
      body: JSON.stringify({
        avatar: imageURL,
      }),
    });
    return this._checkResponse(res);
  }
}

export const api = new Api({
  baseURL: "http://127.0.0.1:3001",
  headers: {
    authorization: "47013706-890f-4248-97af-220f7fa64e36",
    "Content-Type": "application/json",
  },
});
