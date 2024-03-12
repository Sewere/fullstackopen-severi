import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const initialState = []

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    setBlogs: (state, action) => {
      return action.payload
    },
    addBlog: (state, action) => {
      state.push(action.payload)
    },
    deleteBlog: (state, action) => {
      const id = action.payload;
      return state.filter(blog => blog.id !== id);
    },
    likeBlog: (state, action) => {
      const id = action.payload;
      return state.map(blog => {
        if (blog.id === id) {
          return { ...blog, likes: blog.likes + 1 };
        } else {
          return blog;
        }
      });
    },
  }
})

export const { setBlogs, addBlog, deleteBlog, likeBlog } = blogSlice.actions

export const fetchBlogs = () => {
  return async (dispatch) => {
    try {
      const fetchedBlogs = await blogService.getAll();
      dispatch(setBlogs(fetchedBlogs));
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };
};

export const createBlog = (blogObject) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.create(blogObject);
      dispatch(addBlog(newBlog));
    } catch (error) {
      console.error('Error creating blog:', error);
    }
  };
};

export const removeBlog = (id) => {
  return async (dispatch) => {
    try {
      await blogService.destroy(id);
      dispatch(deleteBlog(id));
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };
};

export const likeBlogById = (id) => {
  return async (dispatch) => {
    try {
      await blogService.update(id, { likes: 1 }); // Assuming likes increment by 1
      dispatch(likeBlog(id));
    } catch (error) {
      console.error('Error liking blog:', error);
    }
  };
};

export default blogSlice.reducer
