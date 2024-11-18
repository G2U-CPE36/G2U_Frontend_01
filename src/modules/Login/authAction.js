import { createAsyncThunk } from "@reduxjs/toolkit"
import axiosInstance from "../../axiosInstance"

export const loginToSystem = createAsyncThunk("/login", async (payload, { rejectWithValue }) => {
	try {
		const response = await axiosInstance.post("/login", payload)
		return response.data
	} catch (error) {
		return rejectWithValue(error.response ? error.response.data : error.message)
	}
})

export const registerToSystem = createAsyncThunk("/register", async (payload, { rejectWithValue }) => {
	try {
		const response = await axiosInstance.post("/register", payload)
		return response.data
	} catch (error) {
		return rejectWithValue(error.response ? error.response.data : error.message)
	}
})