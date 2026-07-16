import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { login, logout } from "../slice/auth";
import baseQueryWithReauth from "./baseQuery";

// const baseQuery = fetchBaseQuery({
//   baseUrl: "http://localhost:8000/api",
//   prepareHeaders: (headers, { getState, endpoint }) => {
//     const token = getState().auth.accessToken;

//     const protectedEndpoints = ["getUsers"];

//     if (token && protectedEndpoints.includes(endpoint)) {
//       headers.set("Authorization", `Bearer ${token}`);
//     }

//     return headers;
//   },
// });

const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => ({ url: "/users", credentials: "include" }),
      providesTags: (result, error, arg) => [
        ...result.map(({ id }) => ({ type: "Users", id })),
        { type: "Users", id: "LIST" },
      ],
    }),
    loginUser: builder.mutation({
      query: (user) => ({
        url: "/auth/login",
        method: "POST",
        body: user,
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log(data);
          dispatch(
            login({
              user: data.user,
              accessToken: data.accessToken,
            }),
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
        credentials: "include",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(logout());
        } catch (error) {
          console.log(error);
        }
      },
    }),
    refreshToken: builder.mutation({
      query: () => ({
        url: "/auth/refresh",
        method: "POST",
        credentials: "include",
      }),
    }),
  }),
});

export const { useGetUsersQuery, useLoginUserMutation, useLogoutUserMutation, useRefreshTokenMutation} = usersApi;
export default usersApi;
