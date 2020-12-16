import { Player } from '../constants';
import { parseResponse } from '../helpers';

function getAll() {
  return fetch(`${process.env.REACT_APP_API_URL}/user`).then(response => response.text().then(text => {
    if(response.ok) {
      return JSON.parse(text);
    }
    
    return Promise.reject(response.statusText);
  }));
}

function getUser(username: string) {
  return fetch (`${process.env.REACT_APP_API_URL}/user/${username}`)
    .then(response => response.text().then(text => {
      if (response.ok) {
        return JSON.parse(text);
      }

      return Promise.reject(response.statusText);
    }));
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

async function login(username: string, password: string) {
  const success = fetch(`${process.env.REACT_APP_API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  }).then(parseResponse);

  if (success) {
    const text = await fetch(`${process.env.REACT_APP_API_URL}/user/${username}`).then(response => response.text());
    let { scores: omitted, ...userData } = JSON.parse(text);
    localStorage.setItem('user', JSON.stringify(userData));
    return true;
  }

  return false;
}

function logout() {
  localStorage.removeItem('user');
}

function register(username: string, password: string, player: Player) {
  return fetch(`${process.env.REACT_APP_API_URL}/user`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password, player })
  }).then(parseResponse);
}

async function update(
  username: string,
  data: {
    password?: string,
    level?: number,
    score?: number,
    player?: Player
  }) {
  const result = await fetch(`${process.env.REACT_APP_API_URL}/user/${username}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(parseResponse);

  if (result) {
    let userData = localData();
    if (data.player) { userData.player = data.player; }
    localStorage.setItem('user', JSON.stringify(userData));
  }

  return result;
}

export { getAll, getUser, isAuthenticated, localData, login, logout, register, update };
