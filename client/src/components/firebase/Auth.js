import React, { useState, useEffect } from 'react';
import {auth} from './Firebase';
import Loading from '../Loading';

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoadingUser(false);
      console.log(`current user is populated`)
      console.log(user)
    });
  }, []);

  if (loadingUser) {
    return <Loading />;
  }

  return (
    //return the currentUser and render the children
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
