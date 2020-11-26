function authHeader() {
  let user: any = {};
  let localUser = localStorage.getItem('user');
  if (localUser) {
    user = JSON.parse(localUser);
  }

  const headers: HeadersInit = new Headers();

  if (user && user.authdata) {
    headers.set('Authorization', `Basic ${user.authdata}`);
  }

  return headers;
}

function parseResponse(response: Response) {
  return response.text().then(text => {
    if (response.ok) { return true; }
    return Promise.reject(response.statusText);
  });
}

function getAll() {
  return fetch(`${process.env.REACT_APP_API_URL}/user`, {
    method: 'GET',
    headers: authHeader()
  });
}

function login(username: string, password: string) {
  return fetch(`${process.env.REACT_APP_API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  }).then(parseResponse)
    .then(() => {
      const user = {
        username: username,
        authdata: window.btoa(`${username}:${password}`)
      };
      localStorage.setItem('user', JSON.stringify(user));
    });
}

function logout() {
  localStorage.removeItem('user');
}

export { getAll, login, logout };
