function parseResponse(response: Response) {
  return response.text().then(text => {
    if (response.ok) { return true; }
    return Promise.reject(response.statusText);
  });
}

export { parseResponse };
