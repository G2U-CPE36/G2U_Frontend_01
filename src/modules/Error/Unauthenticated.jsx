import { useNavigate, useLocation } from "react-router-dom"

export default function Unauthenticated() {
	const navigate = useNavigate()
	const location = useLocation()

	const from = location?.pathname || "/"

	// function handleLogin() {
	// 	navigate("/login", { state: { from: from } })
	// }

	return (
		<div className="text-center mt-12">
			<h1>Access Denied</h1>
			<p>You need to log in to access this page.</p>
			<button
				type="button"
				onClick={() => navigate("/login", { state: { from: from } })}
				className="px-4 py-2 text-lg"
			>
				Log In
			</button>
		</div>
	)
}
