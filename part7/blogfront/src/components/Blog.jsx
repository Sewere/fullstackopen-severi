import React from "react";
import Toggleable from "./Toggleable";
import blogService from "../services/blogs";
import { useDispatch, useSelector  } from "react-redux";
import { removeBlog, likeBlogById  } from '../reducers/blogReducer';

const Blog = ({ blog, currentUser }) => {
  const dispatch = useDispatch();

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const handleDelete = () => {
    dispatch(removeBlog(blog.id));
  };

  const handleLike = () => {
    dispatch(likeBlogById(blog.id));
  };
  /*
  const handleLike = async () => {
    console.log("LIKE CLICKED");
    try {
      const modifiedBlog = { ...blog, likes: blog.likes + 1 };
      const updatedBlog = await blogService.update(
        modifiedBlog.id,
        modifiedBlog,
      );
      //updateBlogs();
    } catch (error) {
      console.error("Error liking blog:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const confirmed = window.confirm(
        `Do you want to delete blog "${blog.title}"?`,
      );
      if (!confirmed) {
        return;
      }
      await blogService.destroy(blog.id);
      //updateBlogs();
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };*/

  const isUserBlog =
    currentUser && blog.user && currentUser.name === blog.user.name;

  return (
    <div className="blog" style={blogStyle}>
      <strong>{blog.title}</strong>
      <p>Author: {blog.author}</p>
      <Toggleable buttonLabel="Show Info">
        <div className="more-info">
          <p>URL: {blog.url}</p>
          <p>Likes: {blog.likes}</p>
          <button id="like-btn" className="like-btn" onClick={handleLike}>
            Like
          </button>
          <p>User: {blog.user.name}</p>
          {isUserBlog && <button onClick={handleDelete}>Delete</button>}
        </div>
      </Toggleable>
    </div>
  );
};

export default Blog;
