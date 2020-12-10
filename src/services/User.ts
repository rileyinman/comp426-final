import { Player } from '../constants';
import { parseResponse } from '../helpers';

function getAll() {
  return fetch(`${process.env.REACT_APP_API_URL}/user`);
}

function isAuthenticated() {
  if (localStorage.getItem('user')) {
    return true;
  }

  return false;
}

function localData() {
  if (localStorage.getItem('user')) {
    const localUser = localStorage.getItem('user');
    return localUser && JSON.parse(localUser);
  }

  return null;
}

function login(username: string, password: string) {
  return fetch(`${process.env.REACT_APP_API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  }).then(parseResponse)
    .then(() => {
      fetch(`${process.env.REACT_APP_API_URL}/user/${username}`)
        .then(response => response.text().then(text => {
          let { scores: omitted, ...userData } = JSON.parse(text);
          localStorage.setItem('user', JSON.stringify(userData));
        }));
    });
}

function logout() {
  localStorage.removeItem('user');
}

function register(username: string, password: string, player: Player) {
  return fetch(`${process.env.REACT_APP_API_URL}/user`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password, player })
  }).then(parseResponse)
}

export { getAll, isAuthenticated, localData, login, logout, register };
