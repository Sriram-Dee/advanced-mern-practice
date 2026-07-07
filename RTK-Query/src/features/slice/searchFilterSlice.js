import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    productsQuery: '',
    category: '',
    postsQuery: '',
};

const searchFilterSlice = createSlice({
    name: 'searchFilter',
    initialState,
    reducers: {
        setProductsQuery: (state, action) => {
            state.productsQuery = action.payload;
        },
        setPostsQuery: (state, action) => {
            state.postsQuery = action.payload;
        },
        setCategory: (state, action) => {
            state.category = action.payload;
        }
        
    }
});

export const selectProductsQuery = (state) => state.searchFilter.productsQuery;
export const selectPostsQuery = (state) => state.searchFilter.postsQuery;
export const selectCategory = (state) => state.searchFilter.category;
export const { setProductsQuery, setCategory, setPostsQuery } = searchFilterSlice.actions;
export default searchFilterSlice.reducer;