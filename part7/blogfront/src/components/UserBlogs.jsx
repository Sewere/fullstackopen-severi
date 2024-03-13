import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import userService from "../services/users"

const UserBlogs = () => {
  const { userId } = useParams()

  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await userService.getUserById(userId);
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [userId]);

  return (
    <div>
      <h2>{user.username} Blogs</h2>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>
            <strong>{blog.title}</strong> - Likes: {blog.likes}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserBlogs;
