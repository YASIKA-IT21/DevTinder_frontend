import React, { useEffect } from "react";
import EditProfile from "./EditProfile";
import { useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector((store) => store.user);

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <div>
      <h1>Profile page</h1>
      <EditProfile user={user} />
    </div>
  );
};

export default Profile;
