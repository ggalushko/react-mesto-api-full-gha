const BASE_URL = 'https://api.mestofull.nomoreparties.co';

  function checkResult(res) {
  
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(res.status)
  }

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: email,
      password: password
    })
  }).then((res) => checkResult(res))
};

export const login = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: email,
      password: password
    })
  }).then((res) => checkResult(res))
};

export const tokenCheck = (jwt) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Authorization' : `Bearer ${jwt}`
    },
  }).then((res) => checkResult(res))
};

export const exit = () => {
  return fetch(`${BASE_URL}/exit`, {
    method: 'GET',
    credentials: 'include'
  }).then((res) => checkResult(res))
};