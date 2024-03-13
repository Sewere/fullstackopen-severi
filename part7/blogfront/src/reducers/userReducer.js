import loginService from '../services/login';
import blogService from '../services/blogs';
import userService from '../services/users';

export const SET_USERS = 'SET_USERS';
export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const LOGOUT = 'LOGOUT';


const initialState = {
  users: [],
  currentUser: null
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
  case SET_USERS:
    return {
      ...state,
      users: action.data
    };
  case SET_CURRENT_USER:
    return {
      ...state,
      currentUser: action.data
    };
  case LOGOUT:
    return {
      ...state,
      currentUser: null
    };
  default:
    return state;
  }
};

export const setUsers = (users) => ({
  type: SET_USERS,
  data: users
});

export const setCurrentUser = (user) => ({
  type: SET_CURRENT_USER,
  data: user
});

export const logout = () => ({
  type: LOGOUT
});

export const login = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({
        username: username,
        password: password
      });
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user));
      blogService.setToken(user.token);
      dispatch(setCurrentUser(user));
    } catch (exception) {
      return exception;
    }
  };
};

export const getAllUsers = () => {
  return async (dispatch) => {
    try {
      // Fetch all users from the backend
      const users = await userService.getUsers();
      // Update the Redux state with the retrieved users
      console.log("I GOT THIS", users)
      dispatch(setUsers(users));
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };
};

export default userReducer;
