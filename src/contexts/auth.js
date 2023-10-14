// @ts-ignore  

import { ReactNode, createContext, useEffect, useState } from "react";
import { Cytomine, User, ProjectCollection } from "cytomine-client";
import { useAsyncValue } from "react-router-dom";

const CYTOMINE_URL = "http://maods.homelab.core/"
const cytomine = new Cytomine(CYTOMINE_URL);



export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();


  async function signin(email, password) {
    let rememberMe = true
    await cytomine.login(email, password, rememberMe);

  };
  async function getUserData() {
    const UserData = await User.fetchCurrent();
    setUser(UserData)
    sessionStorage.setItem('authenticated', 'true');
    sessionStorage.setItem('user-data', UserData);

  }

  function isAuthenticated() {
    const isAuthenticated = sessionStorage.getItem('authenticated') === 'true';
    if (isAuthenticated)
      return true;
  }

  async function signup(
    username,
    password,
    firstname,
    lastname,
    email
  ) {
    console.log(username)
  };

  function signout() {
    sessionStorage.removeItem('authenticated');
    cytomine.logout()
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        signin,
        signup,
        signout,
        getUserData
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
