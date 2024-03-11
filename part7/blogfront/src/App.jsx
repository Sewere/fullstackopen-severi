import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import Toggleable from "./components/Toggleable";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import "../index.css";
import { useDispatch } from "react-redux";
import { setNotificationWithDuration } from "./reducers/notificationsReducer";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showError, setShowError] = useState(false);
  const [loginVisible, setLoginVisible] = useState(false);
  const blogFormRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    updateBlogs();
  }, []);

  useEffect(() => {
    //window.localStorage.removeItem('loggedNoteappUser')
    const loggedUserJSON = window.localStorage.getItem("loggedBlogUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const updateBlogs = async () => {
    try {
      const fetchedBlogs = await blogService.getAll();
      fetchedBlogs.sort((a, b) => b.likes - a.likes);
      setBlogs(fetchedBlogs);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedBlogUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      dispatch(setNotificationWithDuration(`Wrong credentials!`, 5000));
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogUser");
    dispatch(setNotificationWithDuration(`Logged out.`, 5000));
    setUser(null);
  };

  const addBlog = (blogObject) => {
    if (blogFormRef.current) {
      blogFormRef.current.toggleVisibility();
    }
    blogService.create(blogObject).then((returnedBlog) => {
      setBlogs(blogs.concat(returnedBlog));
      dispatch(
        setNotificationWithDuration(
          `A new blog: ${returnedBlog.title} by ${returnedBlog.author} added.`,
          5000,
        ),
      );
    });
  };
  const blogForm = () => (
    <Toggleable buttonLabel="New Blog" ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Toggleable>
  );

  const showBlogs = () => {
    blogs.sort;
    return (
      <ul>
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            updateBlogs={updateBlogs}
            currentUser={user}
          />
        ))}
      </ul>
    );
  };

  if (user === null) {
    return (
      <div>
        <h2>Login please</h2>
        {showError && <Notification message={errorMessage} />}
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      </div>
    );
  }
  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <div>
        <p>{user.name} logged in</p>
      </div>
      {showBlogs()}
      <button onClick={handleLogout}>Logout</button>
      {blogForm()}
    </div>
  );
};

export default App;
