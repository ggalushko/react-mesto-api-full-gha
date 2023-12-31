class Api {
  constructor(options) {
    this._options = options;
  }

  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка ${res.status}`);
  }

  async getInitialCards() {
    const res = await fetch(`${this._options.baseURL}/cards`, {
      credentials: "include",
      headers: {
        ...this._options.headers,
      },
    });
    return this._checkResponse(res);
  }

  async addCard(name, link) {
    const res = await fetch(`${this._options.baseURL}/cards`, {
      credentials: "include",
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
      credentials: "include",
      headers: {
        ...this._options.headers,
      },
    });
    return this._checkResponse(res);
  }

  async editProfile({ name, about }) {
    const res = await fetch(`${this._options.baseURL}/users/me `, {
      credentials: "include",
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

  async deleteCard(_id) {
    const res = await fetch(`${this._options.baseURL}/cards/${_id}`, {
      credentials: "include",
      method: "DELETE",
      headers: {
        ...this._options.headers,
      },
    });
    return this._checkResponse(res);
  }


  async addLike(_id) {
    const res = await fetch(`${this._options.baseURL}/cards/${_id}/likes`, {
      credentials: "include",
      method: "PUT",
      headers: {
        ...this._options.headers,
      },
    });
    return this._checkResponse(res);
  }

  async removeLike(_id) {
    const res = await fetch(`${this._options.baseURL}/cards/${_id}/likes`, {
      credentials: "include",
      method: "DELETE",
      headers: {
        ...this._options.headers,
      },
    });
    return this._checkResponse(res);
  }

  async changeAvatar(imageURL) {
    const res = await fetch(`${this._options.baseURL}/users/me/avatar`, {
      credentials: "include",
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
  baseURL: "https://api.mestofull.nomoreparties.co",
  headers: {
    authorization: localStorage.getItem("jwt"),
    "Content-Type": "application/json",
  },
});
