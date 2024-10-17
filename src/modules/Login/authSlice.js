import { createSlice } from "@reduxjs/toolkit"

const initialState = {
	loading: false,
	userInfo: {},
	userToken: null,
	error: null,
	success: false,
}

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		// Use builder.addCase to handle actions
	},
})

export default authSlice.reducer
