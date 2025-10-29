import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { socket } from "../utils/socket";
import { useSelector } from 'react-redux';

const Chat = () => {
  const { userId: receiverId } = useParams();
  const loggedInUser = useSelector(store => store.user);
  const senderId = loggedInUser?._id;

  const [receiverName, setReceiverName] = useState("");
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const chatEndRef = useRef(null);

  useEffect(() => {
  const markMessagesAsRead = async () => {
    try {
      await axios.put(`${BASE_URL}/chat/mark_message_read/${receiverId}`, {}, { withCredentials: true });
    } catch (err) {
      console.log("Error marking messages as read:", err.message);
    }
  };

  if (receiverId) markMessagesAsRead();
}, [receiverId]);


  // Scroll to bottom on new message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Join room and listen for messages
  useEffect(() => {
    if (!senderId) return;

    socket.emit("join", senderId);

    socket.on("receiveMessage", (msg) => {
      setMessages(prev => [...prev, msg]);
    });

    return () => socket.off("receiveMessage");
  }, [senderId]);

  // Fetch receiver info
  useEffect(() => {
    const fetchReceiver = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/user/${receiverId}`, { withCredentials: true });
        const data = res.data.user;
        setReceiverName(`${data.firstName} ${data.lastName}`);
      } catch (err) {
        console.log("Error fetching receiver info:", err.message);
      }
    };
    if (receiverId) fetchReceiver();
  }, [receiverId]);

  // Fetch chat history
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/chat/${receiverId}`, { withCredentials: true });
        setMessages(res.data);
      } catch (err) {
        console.log("Error fetching chat history:", err.message);
      }
    };
    if (receiverId) fetchMessages();
  }, [receiverId]);

  const sendMessage = () => {
    if (!text.trim()) return;

    socket.emit("sendMessage", { sender: senderId, receiver: receiverId, text });
    setText(""); // clear input
  };

  return (
    <div className="min-h-screen py-8 bg-gradient-to-r from-purple-100 via-pink-50 to-purple-100 flex flex-col items-center justify-center">
      <div className="w-full max-w-md flex flex-col">
        <h2 className="text-2xl font-bold mb-4 text-center text-black">
          Chat with {receiverName || receiverId}
        </h2>

        <div className="flex flex-col w-full h-96 border rounded-lg bg-white overflow-y-auto p-4 mb-4">
          {messages.length === 0 ? (
            <p className="text-gray-400 text-center mt-10">No messages yet. Start the conversation!</p>
          ) : (
            messages.map((msg, i) => (
              <div
                key={i}
                className={`mb-2 p-2 rounded-lg max-w-xs ${
                  msg.sender === senderId ? "bg-blue-500 text-white self-end" : "bg-gray-200 text-gray-800 self-start"
                }`}
              >
                {msg.message}
              </div>
            ))
          )}
          <div ref={chatEndRef} />
        </div>

        <div className="flex w-full">
          <input
            type="text"
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 p-2 border rounded-l-lg focus:outline-none"
            onKeyDown={e => e.key === 'Enter' && sendMessage()}
          />
          <button
            onClick={sendMessage}
            className="bg-blue-500 text-white px-4 rounded-r-lg hover:bg-blue-600 transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
