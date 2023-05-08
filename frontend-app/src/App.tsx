import React from 'react';

import './styles/global.css';
import Router from './router';
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID!!}>
        <Router />
    </GoogleOAuthProvider>
  );
}

export default App;
