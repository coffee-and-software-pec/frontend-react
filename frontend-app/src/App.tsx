import React from 'react';

import './styles/global.css';
import Router from './router';
import { GoogleOAuthProvider } from '@react-oauth/google';
import User from './models/User';
import { AuthContextProvider } from './contexts/AuthContext';

import { ChakraProvider } from '@chakra-ui/react'

function App() {
  // const { user, login, logout } = useAuth();

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID!!}>
      <AuthContextProvider>
        <Router />
      </AuthContextProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
