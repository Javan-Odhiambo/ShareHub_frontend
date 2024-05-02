import { createSlice } from "@reduxjs/toolkit";
// Todo confirm handling of localstorage!!

const initialState = {
	accessToken:
		typeof window !== "undefined"
			? window.localStorage.getItem("accessToken")
			: false,
	refreshToken:
		typeof window !== "undefined"
			? window.localStorage.getItem("refreshToken")
			: false,
	isAuthenticated: false,
};

const authSlice = createSlice({
	name: "authSlice",
	initialState,
	reducers: {
        login:(state,action)=>{
            state.isAuthenticated = true
            state.accessToken = action.payload.access
            state.refreshToken = action.payload.refresh
            localStorage.setItem("refreshToken", action.payload.refresh)
            localStorage.setItem("accessToken", action.payload.access)
        },
        setToken:(state,action)=>{
            state.isAuthenticated = true
            state.accessToken = action.payload
            localStorage.setItem("accessToken",action.payload)
        },
        logout:(state)=>{
            state.isAuthenticated = false
            localStorage.removeItem("accessToken")
            localStorage.removeItem("refreshToken")
        }
    },
});

export const { login, logout, setToken } = authSlice.actions;

export default authSlice.reducer;
