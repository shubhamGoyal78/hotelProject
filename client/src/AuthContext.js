import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => sessionStorage.getItem('isLoggedIn') === 'true'
  );

  // Update sessionStorage when isLoggedIn changes
  useEffect(() => {
    sessionStorage.setItem('isLoggedIn', isLoggedIn);
  }, [isLoggedIn]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};
