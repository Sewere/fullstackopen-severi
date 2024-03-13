import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import Toggleable from "./components/Toggleable";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import "../index.css";
import { useDispatch, useSelector  } from "react-redux";
import { setNotificationWithDuration } from "./reducers/notificationsReducer";
import { fetchBlogs, createBlog, deleteBlog, likeBlog  } from './reducers/blogReducer';
import { login, logout, getAllUsers } from './reducers/userReducer';
import UserList from './components/UserList';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserBlogs from "./components/UserBlogs";

const App = () => {
  //const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  //const [user, setUser] = useState(null);
  //const user = useSelector(({ user }) => {
  //  return user
  //})
  const user = useSelector(state => state.user.currentUser);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showError, setShowError] = useState(false);
  const [loginVisible, setLoginVisible] = useState(false);
  const blogFormRef = useRef();
  const blogs = useSelector(state => state.blog);
  const dispatch = useDispatch();

  useEffect(() => {
    //updateBlogs();
    dispatch(fetchBlogs());
    //const user = loginService.login(username, password);
  }, [dispatch]);

  /*useEffect(() => {
    //window.localStorage.removeItem('loggedNoteappUser')
    const loggedUserJSON = window.localStorage.getItem("loggedBlogUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);*/

  /*
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
  };*/
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      //const useri = await loginService.login(username, password);
      console.log(username)
      console.log(password)
      dispatch(login(username, password));
      setUsername("");
      setPassword("");
    } catch (error) {
      console.error('Error logging in:', error);
      dispatch(setNotificationWithDuration(`Wrong credentials!`, 5000));
    }
  };

  const handleLogout = () => {
    //window.localStorage.removeItem("loggedBlogUser");
    dispatch(setNotificationWithDuration(`Logged out.`, 5000));
    dispatch(logout());
  };

  const addBlog = (blogObject) => {
    dispatch(createBlog(blogObject));
  };
  /*
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
  };*/
  const blogForm = () => (
    <Toggleable buttonLabel="New Blog" ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Toggleable>
  );

  const showBlogs = () => {
    if (!blogs) {
      return <p>Loading blogs...</p>;
    }
    //const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);
    //blogs.sort;
    return (
      <ul>
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            //updateBlogs={updateBlogs}
            currentUser={user}
          />
        ))}
      </ul>
    );
  };
  //console.log("GEtting datasdsds", user)

  return (
    <Router>
      <div>
        <h2>Blog App</h2>
        <Notification />
        {user === null ? (
          <div>
            <h3>Login</h3>
            <LoginForm
              handleSubmit={handleLogin}
              username={username}
              password={password}
              handleUsernameChange={({ target }) => setUsername(target.value)}
              handlePasswordChange={({ target }) => setPassword(target.value)}
            />

          </div>
        ) : (
          <div>
            <p>{user.username} logged in</p>
            <button type="button" onClick={handleLogout}>Logout</button>
            {blogForm()}
            {showBlogs()}
            <UserList />
            <Routes>
              <Route path="/users/:userId" component={UserBlogs} />
            </Routes>
          </div>
        )}
      </div>
    </Router>
  );
};


export default App;
