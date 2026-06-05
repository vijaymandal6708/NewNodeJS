import { useState } from "react";
import { Children } from "react";
import { createContext } from "react";
import { useAuth } from "./AuthProvider.jsx";
import { useEffect } from "react";
import { io } from "socket.io-client";
import { useContext } from "react";

const SocketContext = createContext();

export const useSocketContext = ()=>{
    return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers,setOnlineUsers] = useState([]);
  const [authUser] = useAuth();

  useEffect(() => {
    if (authUser) {
      const socket = io("http://localhost:5002/", {
        query: {
          userId: authUser.user._id,
        },
      });
      setSocket(socket);
      socket.on("getonline", (users)=>{
        setOnlineUsers(users);
        console.log("Socket disconnected");
      });
      return ()=> socket.close();
    }else{
        if(socket){
            socket.close();
            setSocket(null);
        }
    }
  },[authUser]);
  return (
    <SocketContext.Provider value={{socket,onlineUsers}}>
        {children}
    </SocketContext.Provider>
  )
};
