import { useNavigate } from "react-router-dom"

export default function NotFoundPage() {
	const navigate = useNavigate()
	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
			<h1 className="text-6xl font-bold text-gray-800">404</h1>
			<p className="mt-4 text-xl text-gray-600">Page Not Found</p>
			<button
				type="button"
				onClick={() => navigate("/")}
				className="mt-6 px-6 py-2 text-white bg-gray-700 rounded-lg hover:bg-main-yellow focus:outline-none focus:ring focus:ring-blue-300"
			>
				Go to Homepage
			</button>
		</div>
	)
}
