import React, { useState } from 'react';
import Layout from './components/Layout';
import AuthContext from './components/AuthContext';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      <Layout />
    </AuthContext.Provider>
  );
}

export default App;