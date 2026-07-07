import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    user: {},
    isAdmin: false,
    accessToken: '',
    isAuthenticated: false,
}
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload.user;
            state.accessToken = action.payload.accessToken;
            state.isAdmin = action.payload.user.role === 'admin';
            state.isAuthenticated = true;
        },
        logout: (state) => {
            state.user = {};
            state.accessToken = '';
            state.isAuthenticated = false;
        }
    }

});
const selectUser = (state) => state.auth.user;
const selectIsAdmin = (state) => state.auth.isAdmin;
const selectAccessToken = (state) => state.auth.accessToken;
const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export { selectUser, selectIsAdmin, selectAccessToken, selectIsAuthenticated };
export const { login, logout } = authSlice.actions;
export default authSlice.reducer;


