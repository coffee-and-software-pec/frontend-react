
import './styles/global.css';
import Router from './router';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthContextProvider } from './contexts/AuthContext';


function App() {
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID!!}>
      <AuthContextProvider>
        <Router />
      </AuthContextProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
