import axios from "axios"

const axiosInstance = axios.create({
	baseURL: "http://localhost:5432", // URL of the backend server
	timeout: 10000, // Optional: Set a timeout for requests
	headers: {
		"Content-Type": "application/json", // Optional: Set default headers
	},
})

axiosInstance.interceptors.request.use(
	(request) => {
		const accessToken = localStorage.getItem("accessToken")
		if (accessToken) {
			// biome-ignore lint/complexity/useLiteralKeys: <explanation>
			request.headers["Authorization"] = `Bearer ${accessToken}`
		}
		return request
	},
	(error) => {
		return Promise.reject(error)
	},
)

export default axiosInstance
