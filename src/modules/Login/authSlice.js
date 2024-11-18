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
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(loginToSystem.pending, (state) => {
				state.loading = true
				state.error = null
			})
			.addCase(loginToSystem.fulfilled, (state, action) => {
				state.loading = false
				state.userInfo = action.payload.user
				state.token = action.payload.token
			})
			.addCase(loginToSystem.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload || "Failed to login"
			})
		builder
			.addCase(registerToSystem.pending, (state) => {
				state.loading = true
				state.error = null
			})
			.addCase(registerToSystem.fulfilled, (state, action) => {
				state.loading = false
				state.userInfo = action.payload.user
				state.token = action.payload.token
			})
			.addCase(registerToSystem.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload || "Failed to register"
			})
	},
})

export default authSlice.reducer
