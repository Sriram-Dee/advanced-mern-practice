import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000" }),
  tagTypes: ["Products"],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => "/products",
      providesTags: (result, error, arg) => [
        ...result.map(({ id }) => ({ type: "Products", id })),
            { type: "Products", id: "LIST" },
      ]
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (post) => [{ type: "Products", id: post.id }],
    }),

    getProductById: builder.query({
      query: (id) => `/products/${id}`,
      providesTags: (result, error, arg) => [{ type: "Products", id: arg }],}),
  }),
});

export const {
  useGetProductsQuery,
  useDeleteProductMutation,
  useGetProductByIdQuery,
} = productsApi;
export default productsApi;
