import React, { useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { addconnections } from '../utils/ConnectionsSlice';

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connection);

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
  if (connections.length === 0) return <h1>No connections Found</h1>;

  return (
    <div className="m-6">
      <h1 className="text-2xl font-bold mb-6 text-center">✨ Your Connections</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {connections.map((connection) => (
          <div
            key={connection._id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:scale-105 transform transition duration-300 w-56"
          >
            {/* Profile Image - full visible */}
            <img
              src={connection.photoUrl}
              alt={connection.firstName}
              className="w-full h-auto object-contain"
            />

            {/* Details */}
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
  );
};

export default Connections;
