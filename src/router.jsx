import { lazy } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"

const Login = lazy(() => import("@/modules/Login"))
const NotFound = lazy(() => import("@/modules/NotFound"))
const HomePage = lazy(() => import("@/modules/pages/HomePage"))
const TestPage = lazy(() => import("@/modules/pages/TestPage"))

const routes = [
	{ path: "/", element: <HomePage />, index: true },
	{ path: "/login", element: <Login /> },
	{ path: "/test", element: <TestPage /> },
]

export default function Router() {
	return (
		<BrowserRouter>
			<Routes>
				{routes.map((route) => {
					return <Route index={route.index} key={route.path} path={route.path} element={route.element} />
				})}

				<Route path="*" element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	)
}
