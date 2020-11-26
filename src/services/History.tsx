import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { createBrowserHistory, History } from 'history';

const history: History = createBrowserHistory();

class MyBrowserRouter extends BrowserRouter {
  history: History = history;
}

export { history, MyBrowserRouter };
