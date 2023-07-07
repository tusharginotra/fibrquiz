import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  
  if (isLoading) {
    return <div>Loading ...</div>;
  }
  console.log(user)

  return (
    isAuthenticated && (
      <div style={{display:'flex', alignItems:'center' }} >
        <img style={{borderRadius:'100%', height:'3rem'}} src={user.picture} alt={user.name} />
        <h2 style={{margin:1, padding:2}}>{user.name}</h2>
        <p>{user.email}</p>
      </div>
    )
  );
};

export default Profile;