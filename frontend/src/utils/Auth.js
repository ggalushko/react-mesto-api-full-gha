class Auth {
  constructor(options) {
    this._options = options;
  }

  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка ${res.status}`);
  }

  async signUp(email, password) {
    const res = await fetch(`${this._options.baseURL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: password,
        email: email,
      }),
    });
    return this._checkResponse(res);
  }

  async signIn(email, password) {
    const res = await fetch(`${this._options.baseURL}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: password,
        email: email,
      }),
    });

    return this._checkResponse(res);
  }

  async checkToken(jwt) {
    const res = await fetch(`${this._options.baseURL}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    });
    return this._checkResponse(res);
  }
}

export const auth = new Auth({
  baseURL: "http://api.mestofull.nomoreparties.co",
});
