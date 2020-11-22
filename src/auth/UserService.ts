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
    let data;
    if (text) {
      data = JSON.parse(text);
    }

    if (response.ok) { return data; }

    if (response.status === 401) {
      logout();
      window.location.reload(true);
    }

    let error = response.statusText;
    if (data) {
      error = data.message;
    }

    return Promise.reject(error);
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
    .then(user => {
      if (user) {
        user.authdata = window.btoa(`${username}:${password}`);
        localStorage.setItem('user', JSON.stringify('user'));
      }
      return user;
    });
}

function logout() {
  localStorage.removeItem('user');
}

export { getAll, login, logout };
