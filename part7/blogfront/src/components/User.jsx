import React from 'react';
import { useSelector } from 'react-redux';

const User = () => {
  const user = useSelector(state => state.user);

  return (
    <div>
      <h2>User Information</h2>
      {user ? (
        <div>
          <p>Username: {user.username}</p>
          <p>Name: {user.name}</p>
          {/* Render additional user information as needed */}
        </div>
      ) : (
        <p>No user information available</p>
      )}
    </div>
  );
};

export default User;
