import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const initialState = {
  posts: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await response.json();
  return data;
});

const createPost = createAsyncThunk('posts/createPost', async (newPost) => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newPost),
  });
  const data = await response.json();
  return data;
});

const updatePost = createAsyncThunk('posts/updatePost', async (updatedPost) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${updatedPost.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedPost),
  });
  const data = await response.json();
  return data;
});

const deletePost = createAsyncThunk('posts/deletePost', async (postId) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  const data = await response.json();
  return data;
});

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Get all posts
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        console.log(action.payload);
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
      // update post
      builder
      .addCase(updatePost.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.posts.findIndex(post => post.id === action.payload.id);
        if (index !== -1) {
          state.posts[index] = action.payload;
        }
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });

      //create post

      builder.addCase(createPost.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      }).addCase(createPost.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts.unshift(action.payload);
      }).addCase(createPost.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });

      // delete post
      builder.addCase(deletePost.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      }).addCase(deletePost.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = state.posts.filter(post => post.id !== action.payload.id);
      }).addCase(deletePost.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });

  },
});

export default postSlice.reducer;
const allPosts = (state) => state.posts.posts;
const postsStatus = (state) => state.posts.status;
const getPostsError = (state) => state.posts.error;

export { allPosts, postsStatus, getPostsError };
export { fetchPosts, updatePost, createPost, deletePost };