import { lazy, Suspense } from "react"
import { Route, Routes } from "react-router-dom"
import CircularProgress from "@mui/material/CircularProgress"

// Lazy loading will render the components when it's needed
const Login = lazy(() => import("@/modules/Login"))
const Register = lazy(() => import("@/modules/Register"))
const NotFound = lazy(() => import("@/modules/NotFound"))
const MainPage = lazy(() => import("@/modules/pages/MainPage"))
const TestPage = lazy(() => import("@/modules/pages/TestPage"))
const LikePage = lazy(() => import("@/modules/pages/LikeProduct"))


const routes = [
	{ path: "/", element: <MainPage />, index: true },
	{ path: "/login", element: <Login /> },
	{ path: "/test", element: <TestPage /> },
	{ path: "/likeproduct", element: <LikePage /> },
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
