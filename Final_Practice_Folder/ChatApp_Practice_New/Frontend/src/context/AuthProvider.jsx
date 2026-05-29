import React from "react";
import { createContext } from "react";
import Cookies from "js-cookie";
import { useState } from "react";
import { useContext } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const initialUserState = Cookies.get("jwt") || localStorage.getItem("messenger");

  //parse the user and storing in state
  const [authUser, setAuthUser] = useState(initialUserState ? JSON.parse(initialUserState) : undefined,);
  
  return (
    <AuthContext.Provider value={{authUser, setAuthUser}}>
        {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
