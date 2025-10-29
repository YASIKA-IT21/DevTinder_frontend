import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../utils/constant';
import { addconnections } from '../utils/ConnectionsSlice';
import { MessageCircle } from "lucide-react";

const Connections = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const connections = useSelector((store) => store.connection);
  const loggedInUser = useSelector((store) => store.user); // get logged-in user from Redux

  // Fetch connections from backend
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", { withCredentials: true });
      dispatch(addconnections(res.data.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return <p>Loading...</p>;

  return (
    <div className="min-h-screen py-8 bg-gradient-to-r from-purple-100 via-pink-50 to-purple-100">
      {connections.length === 0 ? (
        <div className="flex flex-col justify-center items-center h-full">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-4 text-center">
            No More Persons to View
          </h1>
          <p className="text-gray-600 text-center max-w-sm">
            You have reached the end. Come back later to see new users and connections.
          </p>
        </div>
      ) : (
        <div className="m-6">
          <h1 className="text-2xl font-bold mb-6 text-center text-black">✨ Your Connections</h1>
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {connections.map((connection) => (
              <div
                key={connection._id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:scale-105 transform transition duration-300 w-56 relative"
              >
                <img
                  src={connection.photoUrl}
                  alt={connection.firstName}
                  className="w-full h-56 object-cover"
                />

                {/* Chat Button */}
                <button
                  onClick={() => {
                    // Navigate to chat page with receiverId in URL
                    navigate(`/chat/${connection._id}`);
                    // <Chat receiver ={connection._id}/>
                  }}
                  className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition"
                  title={`Chat with ${connection.firstName}`}
                >
                  <MessageCircle className="w-6 h-6 text-blue-500" />
                  {connection.unreadCount > 0 && (
        <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full"></span>
      )}

                </button>

                <div className="p-3 bg-gradient-to-r from-pink-50 via-white to-purple-50 text-center">
                  <h2 className="text-lg font-semibold text-gray-800 truncate">
                    {connection.firstName} {connection.lastName}
                  </h2>
                  <p className="text-gray-600 text-xs mt-1 line-clamp-2">
                    {connection.about || "No bio available"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Connections;
