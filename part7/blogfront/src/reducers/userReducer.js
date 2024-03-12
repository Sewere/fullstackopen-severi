import { createSlice } from '@reduxjs/toolkit';
import loginService from '../services/login'

const initialState = {
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;

export const loginUser = (username, password) => {
  return async (dispatch) => {
    try {
      const user = loginService.login(username, password);
      dispatch(setUser(user));
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };
};