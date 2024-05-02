import { createSlice } from "@reduxjs/toolkit";
// Todo confirm handling of localstorage!!
interface authSlice {
	isAuthenticated: boolean;
    accessToken: string;
    refreshToken: string;
}

const initialState : authSlice = {
	isAuthenticated: false,
    accessToken: localStorage.getItem('accessToken') || "",
    refreshToken: localStorage.getItem('refreshToken') || "",
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
