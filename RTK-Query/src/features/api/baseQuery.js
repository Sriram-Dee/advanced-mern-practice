import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8000/api",
  credentials: "include",
  prepareHeaders: (headers, { getState, endpoint }) => {
    const token = getState().auth.accessToken;

    if(token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

export default baseQuery;