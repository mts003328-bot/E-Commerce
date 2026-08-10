import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    accessToken: localStorage.getItem("accessToken"),
    refreshToken: localStorage.getItem("refreshToken"),
    user: null,
};

const authSlice = createSlice({
    name: "auth",

    initialState,

    reducers: {

        login: (state, action) => {
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
            state.user = action.payload.user;

            localStorage.setItem(
                "accessToken",
                action.payload.accessToken
            );

            localStorage.setItem(
                "refreshToken",
                action.payload.refreshToken
            );
        },

        setUser: (state, action) => {
            state.user = action.payload;
        },

        logout: (state) => {
            state.accessToken = null;
            state.refreshToken = null;
            state.user = null;

            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
        },
    },
});

export const {
    login,
    setUser,
    logout,
} = authSlice.actions;

export default authSlice.reducer;