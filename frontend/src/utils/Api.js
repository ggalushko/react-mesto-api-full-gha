class Api {

  constructor(token) {

    this._token = token;
  }

  _checkResult(res) {
  
    if (res.ok) {
      return res.json();
    } 
      return Promise.reject(res.status)
  }

  load() {

    return Promise.all([
      fetch('https://api.mestofull.nomoreparties.co/users/me', {
        credentials: "include",
        headers: {
          authorization: this._token
        }
      }).then((res) => this._checkResult(res)),

      fetch('https://api.mestofull.nomoreparties.co/cards', {
      credentials: "include",
      headers: {
        authorization: this._token
      }
    }).then((res) => this._checkResult(res))
    ])
  }

  editProfile({fullName, specialty}) {

    return fetch('https://api.mestofull.nomoreparties.co/users/me', {
      method: 'PATCH',
      credentials: "include",
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: fullName,
        about: specialty
      })
    })
      .then((res) => this._checkResult(res))
  }

  addCard({name, link}) {

    return fetch('https://api.mestofull.nomoreparties.co/cards', {
      method: 'POST',
      credentials: "include",
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
      .then((res) => this._checkResult(res))
  }

  deleteCard(cardId) {

    return fetch(`https://api.mestofull.nomoreparties.co/cards/${cardId}`, {
      method: 'DELETE',
      credentials: "include",
      headers: {
        authorization: this._token
      },
    })
      .then((res) => this._checkResult(res))
  }

  changeLikeCardStatus(cardId, isLiked) {
    return isLiked ? this.likeCard(cardId) : this.unLikeCard(cardId);
  }

  likeCard(cardId) {

    return fetch(`https://api.mestofull.nomoreparties.co/cards/${cardId}/likes`, {
      method: 'PUT',
      credentials: "include",
      headers: {
        authorization: this._token
      },
    })
      .then((res) => this._checkResult(res))
  }

  unLikeCard(cardId) {
    return fetch(`https://api.mestofull.nomoreparties.co/cards/${cardId}/likes`, {
      method: 'DELETE',
      credentials: "include",
      headers: {
        authorization: this._token
      },
    })
      .then((res) => this._checkResult(res))
  }

  updateAvatar({avatar}) {
    return fetch('https://api.mestofull.nomoreparties.co/users/me/avatar', {
      method: 'PATCH',
      credentials: "include",
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: avatar
      })
    })
      .then((res) => this._checkResult(res))
  }
}

const api = new Api(localStorage.getItem('jwt'));

export default api;