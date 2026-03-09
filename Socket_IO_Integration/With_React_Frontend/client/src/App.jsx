import { useEffect, useState } from "react";
import {io} from "socket.io-client";
const socket = io("http://localhost:4000");

function App() {

    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    useEffect(()=>{
      socket.on("chat message", (msg)=>{
        setMessages((prev)=> [...prev, msg]);
      });
    }, []);

    const sendMessage = () => {
      if(message.trim() !== ""){
        socket.emit("chat message", message);
        setMessage("");
      }
    }

  return (
    <>
      <h2>Chat App</h2>

      <ul>
        {messages.map((msg,index)=>(
          <li key={index}>{msg}</li>
        ))}
      </ul>

      <input value={message} onChange={(e)=>setMessage(e.target.value)} placeholder="Type message" />

      <button onClick={sendMessage}>Send</button>
    </>
  )
}

export default App
