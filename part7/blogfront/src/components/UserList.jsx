import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllUsers } from '../reducers/userReducer';

const UserList = () => {
  const users = useSelector(state => state.users);
  const dispatch = useDispatch();
  console.log("MITÄÄÄ",users)
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <div>
      <h2>Users</h2>
      {users !== undefined ? (
        <ul>
          {users.map(user => (
            <li key={user.id}>
              <Link to={`/users/${user.id}`}>
                <strong>{user.username}</strong>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
};

export default UserList;
