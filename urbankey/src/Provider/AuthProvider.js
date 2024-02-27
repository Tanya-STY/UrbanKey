// import React, { createContext, useContext, useState, useEffect } from 'react';

// const AuthContext = createContext();

// const AuthProvider = ({ children }) => {
//   const [token, setToken] = useState(null);

//   useEffect(() => {
//     const storedToken = localStorage.getItem('token');
//     if (storedToken) {
//       setToken(storedToken);
//     }
//   }, []);

//   useEffect(() => {
//     console.log('Current token:', token);
//   }, [token]); // This useEffect will run only when token changes

//   const login = (token) => {
//     localStorage.setItem('token', token);
//     setToken(token);
//     console.log('Token set:', token);
//   };

//   const logout = () => {
//     localStorage.removeItem('token');
//     setToken(null);
//   };



//   return (
//     <AuthContext.Provider value={{ token, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// const useAuth = () => useContext(AuthContext);

// export { AuthProvider, useAuth, AuthContext };