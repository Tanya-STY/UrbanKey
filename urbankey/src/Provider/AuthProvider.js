import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext({}); //will hold authentication state and related functions

export const AuthProvider = ({ children }) => { //authprovider will provide authentiction context to its children 
  const [auth, setAuth] = useState({});
  const [unit, setUnit] = useState({});
  const [persist, setPersist] = useState(JSON.parse(localStorage.getItem("persist")) || false);

  return (
  
    <AuthContext.Provider value={{ auth, setAuth, unit, setUnit, persist, setPersist }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;