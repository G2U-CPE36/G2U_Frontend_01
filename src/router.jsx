import { lazy, Suspense } from "react"
import { Route, Routes } from "react-router-dom"
import CircularProgress from "@mui/material/CircularProgress"

// Lazy loading will render the components when it's needed
const Login = lazy(() => import("@/modules/Login"))
const Register = lazy(() => import("@/modules/Register"))
const NotFound = lazy(() => import("@/modules/NotFound"))
const HomePage = lazy(() => import("@/modules/pages/HomePage"))
const TestPage = lazy(() => import("@/modules/pages/TestPage"))

const routes = [
	{ path: "/", element: <HomePage />, index: true },
	{ path: "/login", element: <Login /> },
	{ path: "/test", element: <TestPage /> },
	{ path: "/register", element: <Register /> },
]

export default function Router() {
	return (
		// Suspense uses to wait when UI is being loaded
		<Suspense fallback={<CircularProgress />}>
			<Routes>
				{routes.map((route) => {
					return <Route index={route.index} key={route.path} path={route.path} element={route.element} />
				})}

				<Route path="*" element={<NotFound />} />
			</Routes>
		</Suspense>
	)
}
