import { createSlice } from "@reduxjs/toolkit"
import { loginToSystem, registerToSystem } from "./authAction"

const initialState = {
	loading: false,
	userInfo: {},
	userToken: null,
	error: null,
}

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		deleteToken: () => {
			state.userToken = null
			localStorage.removeItem("token")
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(loginToSystem.pending, (state) => {
				state.loading = true
				state.error = null
			})
			.addCase(loginToSystem.fulfilled, (state, action) => {
				state.loading = false
				state.userInfo = action.payload.userId
				state.userToken = action.payload.token
				localStorage.setItem("token", action.payload.token)
				localStorage.setItem("userId", action.payload.userId)
				localStorage.setItem("username", action.payload.username)
			})
			.addCase(loginToSystem.rejected, (state, action) => {
				state.loading = false
				// Do not forget to remove line "state.userToken = true"
				// state.userToken = true
				state.error = action.payload || "Failed to login"
			})
		builder
			.addCase(registerToSystem.pending, (state) => {
				state.loading = true
				state.error = null
			})
			.addCase(registerToSystem.fulfilled, (state, action) => {
				state.loading = false
				// state.userInfo = action.payload.userId
				// state.userToken = action.payload.token
				// localStorage.setItem("token", action.payload.token)
			})
			.addCase(registerToSystem.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload || "Failed to register"
			})
	},
})
export const { deleteToken } = authSlice.actions

export default authSlice.reducer
