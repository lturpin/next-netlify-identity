import { createContext, useEffect, useState } from 'react';
import netlifyIdentity from 'netlify-identity-widget';
import GoTrue from 'gotrue-js';

const AuthContext = createContext({
  user: null,
  login: () => {},
  logout: () => {},
  authReady: false,
});

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const auth = new GoTrue({
    APIUrl: 'https://lt-next-netlify-identity.netlify.app/.netlify/identity',
    audience: '',
    setCookie: false,
  });

  useEffect(() => {
    netlifyIdentity.on('login', (user) => {
      setUser(user);
      netlifyIdentity.close();
      console.log('login event');
    });
    // init netlify identity connect
    netlifyIdentity.init();

    return () => {
      netlifyIdentity.off('login');
    };
  }, []);

  const login = () => {
    netlifyIdentity.open();
  };

  const context = { user, login, auth };
  return (
    <AuthContext.Provider value={context}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
