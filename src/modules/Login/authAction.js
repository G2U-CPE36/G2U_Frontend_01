import { createAsyncThunk } from "@reduxjs/toolkit"
import axiosInstance from "../../axiosInstance"

export const loginToSystem = createAsyncThunk("/login", async (payload, { rejectWithValue }) => {
	try {
		const response = await axiosInstance.post("http://chawit.thddns.net:9790/api/users/signin", payload)
		console.log(response.data)
		return response.data
	} catch (error) {
		return rejectWithValue(error.response ? error.response.data : error.message)
	}
})

export const registerToSystem = createAsyncThunk("/register", async (payload, { rejectWithValue }) => {
	try {
		const response = await axiosInstance.post("http://chawit.thddns.net:9790/api/users/register", payload)
		console.log(payload)
		return response.data
	} catch (error) {
		return rejectWithValue(error.response ? error.response.data : error.message)
	}
})
