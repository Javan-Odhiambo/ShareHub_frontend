import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isAuthenticated: false,
};

const authSlice = createSlice({
	name: "authSlice",
	initialState,
	reducers: {
        setAuth:(state)=>{
            state.isAuthenticated = true
        },
        logout:(state)=>{
            state.isAuthenticated = false
        },
    },
});

export const { setAuth, logout } = authSlice.actions;

export default authSlice.reducer;
