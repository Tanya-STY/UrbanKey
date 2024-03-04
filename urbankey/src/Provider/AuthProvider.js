import React, { createContext, useContext, useState, useEffect } from 'react';


const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState('');
 const storedToken = localStorage.getItem('token');
  useEffect(() => {
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    console.log('Current token:', token);
  }, [token]); // This useEffect will run only when token changes

  const setTokenInStorage = (token) => {
    localStorage.setItem('token', token);
    setToken(token);
    console.log('Token set:', token);
  };

  const removeTokenFromStorage = () => {
    setToken(null);
    localStorage.removeItem('token');
  };


  return (
    <AuthContext.Provider value={{ token, setToken, setTokenInStorage, removeTokenFromStorage}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);


