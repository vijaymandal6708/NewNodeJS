import React from "react";
import { useState } from "react";
import useConversation from "../statemanage/useConversation.js";
import { useEffect } from "react";
import axios from "axios";

const useGetMessage = () => {
  const [loading, setLoading] = useState(false);
  const {messages, setMessage, selectedConversation} = useConversation();

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      if (selectedConversation && selectedConversation._id) {
        try {
          const res = await axios.get(
            `/api/message/get/${selectedConversation._id}`,
          );

          setMessage(res.data);
          setLoading(false);
        } catch (error) {
          console.log("Error in useGetMessage", error);
        }
      }
    };
    getMessages()
  }, [selectedConversation, setMessage]);
  return {
    messages,
    messages,
    loading,
  };
};

export default useGetMessage;
