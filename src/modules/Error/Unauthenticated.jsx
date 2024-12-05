import { useNavigate, useLocation } from "react-router-dom"

export default function Unauthenticated() {
	const navigate = useNavigate()
	const location = useLocation()

	const from = location?.pathname || "/"

	// function handleLogin() {
	// 	navigate("/login", { state: { from: from } })
	// }

	return (
		<div className="flex flex-col items-center min-h-screen bg-gray-100 text-gray-800 pt-16">
			<h1 className="text-4xl font-bold mb-4">Access Denied</h1>
			<p className="text-lg mb-6">You need to log in to access this page.</p>
			<button
				type="button"
				onClick={() => navigate("/login", { state: { from: from } })}
				className="px-6 py-3 text-white bg-main-yellow rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-blue-300 text-lg font-medium"
			>
				Log In
			</button>
		</div>
	)
}
