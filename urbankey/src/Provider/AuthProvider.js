// import React, { createContext, useContext, useState, useEffect } from 'react';


// const AuthContext = createContext({});

// export const AuthProvider = ({ children }) => {
//   const [token, setToken] = useState('');
//   const [isLoggedIn, setisLoggedIn] = useState(null);
//   const [storedToken, setStoredToken] = useState(null);



//   useEffect(() => {
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


//   return (
//     <AuthContext.Provider value={{ token, isLoggedIn}}>
//       {children}
//     </AuthContext.Provider>
//   );
// };


