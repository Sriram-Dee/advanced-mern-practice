import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseQuery from "./baseQuery.js";

// const baseQuery = fetchBaseQuery({
//   baseUrl: "http://localhost:8000/api",
//   prepareHeaders: (headers, { getState, endpoint }) => {
//     const token = getState().auth.accessToken;

//     const protectedEndpoints = ["createPost", "deletePost", "editPost"];

//     if (token && protectedEndpoints.includes(endpoint)) {
//       headers.set("Authorization", `Bearer ${token}`);
//     }

//     return headers;
//   },
// });

const postsApi = createApi({
  reducerPath: "postsApi",
  baseQuery,
  tagTypes: ["Posts"],
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: ({ page = 1, limit = 10, query = ""}) => `/posts?page=${page}&limit=${limit}&search=${query}`,
      providesTags: (result, err, arg) => [
        ...result.posts.map(({ id }) => ({ type: "Posts", id })),
        { type: "Posts", id: "LIST" },
      ],
    }),
    getPostById: builder.query({
      query: (id) => `/posts/${id}`,
      providesTags: (result, error, arg) => [{ type: "Posts", id: arg }],
    }),
    createPost: builder.mutation({
      query: (post) => ({
        url: "/posts",
        method: "POST",
        body: post,
      }),
      invalidatesTags: [{ type: "Posts", id: "LIST" }],
    }),
    editPost: builder.mutation({
      query: (post) => ({
        url: `/posts/${post._id}`,
        method: "PUT",
        body: post,
      }),
      invalidatesTags: (post) => [{ type: "Posts", id: post.id }],
    }),
    deletePost: builder.mutation({
      query: (id) => ({
        url: `/posts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (post) => [{ type: "Posts", id: "LIST" }],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useLazyGetPostByIdQuery,
  useGetPostByIdQuery,
  useCreatePostMutation,
  useEditPostMutation,
  useDeletePostMutation,
} = postsApi;

export default postsApi;