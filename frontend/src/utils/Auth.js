class Auth {
  constructor(options) {
    this._options = options;
  }

  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка ${res.status}`);
  }

  async signUp(email, password) {
    return fetch(`${  this._options.baseURL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password, email }),
      credentials: "include",
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  async signIn(email, password) {
    return fetch(`${  this._options.baseURL}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password, email }),
      credentials: "include",
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  async checkToken(jwt) {
    return fetch(`${this._options.baseURL}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${jwt}`,
      },
    }).then((res) => {
      return this._checkResponse(res);
    });
}
}

export const auth = new Auth({
  baseURL: "https://api.mestofull.nomoreparties.co",
});
