import React, { useEffect, useState } from 'react';
import Layout from './components/Layout';
import AuthContext from './components/AuthContext';
import Cookies from 'js-cookie';
import axios from 'axios';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [csrftoken, setCsrftoken] = useState(null);

  useEffect(() => {
    const isAuthCookie = Cookies.get('is_authenticated');
    const userCookie = Cookies.get('user');
    // const csrftokenCookie = Cookies.get('csrftoken');

    // console.log(csrftokenCookie);

    if (isAuthCookie) {
      setIsAuthenticated(true);
      setUser(userCookie);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const getCsrfToken = async () => {
      const response = await axios.get('/members/get-csrftoken/');
      setCsrftoken(response.data.csrftoken);
    }
    getCsrfToken();
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, user, setUser, csrftoken }}>
      <Layout />
    </AuthContext.Provider>
  );
}

export default App;