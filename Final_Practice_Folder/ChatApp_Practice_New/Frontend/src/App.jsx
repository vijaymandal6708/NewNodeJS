import React from "react";
import Left from "./home/left/Left";
import Right from "./home/right/Right";
import Logout from "./home/left1/Logout";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { useAuth } from "./context/AuthProvider";
import {Navigate, Route,Routes} from "react-router-dom"

const App = () => {
     const {authUser, setAuthUser}= useAuth();
    //  console.log(authUser);
  return (
    <>

      <Routes>
        <Route path="/" element={
          authUser? (
            <div className="flex h-screen">
              <Logout></Logout>
              <Left></Left>
              <Right></Right>
           </div>
          ) : (
            <Navigate to={"/login"}></Navigate>
          )
        }></Route>
        <Route path="/login" element={authUser?<Navigate to={"/"}></Navigate>:<Login />}></Route>
        <Route path="/signup" element={authUser?<Navigate to={"/"}></Navigate>:<Signup />}></Route>
      </Routes>
    </>
  );
};

export default App;
