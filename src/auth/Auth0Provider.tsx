import React from 'react';
import { useHistory } from 'react-router-dom';
import { AppState, Auth0Provider, Auth0ProviderOptions } from '@auth0/auth0-react';

// TODO: Remove this any??
const Auth0ProviderWithHistory = ({ children }: any) => {
  const history = useHistory();
  const domain = process.env.REACT_APP_AUTH0_DOMAIN;
  const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
  const audience = process.env.REACT_APP_AUTH0_AUDIENCE;

  const onRedirectCallback = (appState: AppState) => {
    history.push(appState?.returnTo || window.location.pathname);
  };

  if (domain == undefined || clientId == undefined) {
    // TODO: Why doesn't this show up in the console? Who knows!
    throw new Error("domain and clientId must be defined in env");
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
      audience={audience}
    >
      {children}
    </Auth0Provider>
  )
}

export default Auth0ProviderWithHistory;
