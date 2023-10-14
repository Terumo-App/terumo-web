// @ts-ignore  

import { createContext, useState } from "react";
import { Cytomine, User } from "cytomine-client";

import axios from 'axios';


const CYTOMINE_URL = "http://maods.homelab.core/"
const TERUMO_CORE_URL = "http://localhost:8000/"
const cytomine = new Cytomine(CYTOMINE_URL);



export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();


  async function signin(email, password) {
    let rememberMe = true
    await cytomine.login(email, password, rememberMe);
    const UserData = await User.fetchCurrent();
    setUser(UserData)
    sessionStorage.setItem('authenticated', 'true');
    sessionStorage.setItem('user-data', UserData);

  };

  async function isAuthenticated() {
    const isAuthenticated = sessionStorage.getItem('authenticated') === 'true';
    if (isAuthenticated)
      return true;
  }

  async function getUserData() {
    const UserData = await User.fetchCurrent();
    return UserData
  }

  async function signup(user) {
    // console.log(user)
    const userData = {
      username: user.username,
      password: user.password,
      first_name: user.firstName,
      last_name: user.lastName,
      email: user.email
    };
    const response = await axios.post(`${TERUMO_CORE_URL}v1/auth/signup`, userData);
    return response
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
