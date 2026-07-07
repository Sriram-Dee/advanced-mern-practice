import { configureStore } from "@reduxjs/toolkit";
import productsApi from "../features/api/productsApi";
import searchFilterReducer from "../features/slice/searchFilterSlice";
import postsApi from "../features/api/postsApi";
import usersApi from "../features/api/usersApi";
import authReducer from "../features/slice/auth";


const store = configureStore({

    reducer: {
        auth: authReducer,
        searchFilter: searchFilterReducer,
        [productsApi.reducerPath]: productsApi.reducer, 
        [postsApi.reducerPath] : postsApi.reducer,
        [usersApi.reducerPath] : usersApi.reducer,
    }
    ,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
    .concat(productsApi.middleware)
    .concat(postsApi.middleware)
    .concat(usersApi.middleware),
})

export default store;