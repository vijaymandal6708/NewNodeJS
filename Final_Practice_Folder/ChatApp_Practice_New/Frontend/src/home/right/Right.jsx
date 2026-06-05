import React from "react";
import Chatuser from "./Chatuser";
import Messages from "./Messages";
import Type from "./Type";
import useConversation from "../../statemanage/useConversation.js";
import { useAuth } from "../../context/AuthProvider.jsx";
import { useEffect } from "react";

export const Right = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  useEffect(() => {
    return setSelectedConversation(null);
  }, []);
  return (
    <>
        <div className="w-full bg-slate-800 text-white">
      <div>
        {!selectedConversation ? (
          <Nochat></Nochat>
        ) : (
          <>
            {""}
              <Chatuser></Chatuser>
              <div
                className="py-2 flex-vijay overflow-y-auto"
                style={{ maxHeight: "calc(88vh - 10vh)" }}
              >
                <Messages></Messages>
              </div>
              <Type></Type>
          </>
        )}
      </div>
        </div>
    </>
  );
};



const Nochat = ()=>{
  const [authUser] = useAuth();
  return (
    <>
      <div className="flex h-screen items-center justify-center">
         <h1 className="font-semibold text-xl">Welcome <span>{authUser.user.name}</span>
          <br /> select a chat to start messanging</h1>
      </div>
    </>
  )
}
