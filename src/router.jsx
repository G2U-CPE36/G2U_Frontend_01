import { lazy, Suspense } from "react"
import { Route, Routes } from "react-router-dom"
import CircularProgress from "@mui/material/CircularProgress"
import { useSelector } from "react-redux"

// Lazy loading will render the components when it's needed
const Login = lazy(() => import("@/modules/Login"))
const Register = lazy(() => import("@/modules/Register"))

const MainPage = lazy(() => import("@/modules/pages/MainPage"))
const NotFound = lazy(() => import("@/modules/Error/NotFound"))
const Unauthenticated = lazy(() => import("@/modules/Error/Unauthenticated"))
const TestPage = lazy(() => import("@/modules/pages/TestPage"))
const LikePage = lazy(() => import("@/modules/pages/LikeProduct"))
const MyPosts = lazy(() => import("@/modules/pages/MyPosts"))
const MyPurchase = lazy(() => import("@/modules/pages/MyPurchase"))
const ProductDetail = lazy(() => import("@/modules/pages/Product"))
const LookingToBuy = lazy(() => import("@/modules/pages/LookingToBuy"))
const AddProduct = lazy(() => import("@/modules/pages/AddProduct"))

const routes = [
	{ path: "/", element: <MainPage />, index: true, isPrivate: false },
	{ path: "/likeproduct", element: <LikePage />, isPrivate: false },
	{ path: "/myposts", element: <MyPosts />, isPrivate: false },
	{ path: "/login", element: <Login />, isPrivate: false },
	{ path: "/test", element: <TestPage />, isPrivate: false },
	{ path: "/register", element: <Register />, isPrivate: false },
	{ path: "/mypurchase", element: <MyPurchase />, isPrivate: false },
	{ path: "/lookingtobuy", element: <LookingToBuy />, isPrivate: true },
	{ path: "/addproduct", element: <AddProduct />, isPrivate: true },
	// change ProductDetail isPrivate: to false
	{ path: "/product/:productID", element: <ProductDetail />, isPrivate: false }];


export default function Router() {
	const data = useSelector((state) => state.auth)
	return (
		// Suspense uses to wait when UI is being loaded
		<Suspense fallback={<CircularProgress />}>
			<Routes>
				{routes.map((route) => {
					if (route.isPrivate) {
						// I think the token should get from local storage
						return data?.userToken ? (
							<Route index={route.index} key={route.path} path={route.path} element={route.element} />
						) : (
							<Route key={route.path} path={route.path} element={<Unauthenticated replace />} />
						)
					}
					if (!route.isPrivate) {
						return <Route index={route.index} key={route.path} path={route.path} element={route.element} />
					}
					return null
				})}

				<Route path="*" element={<NotFound />} />
			</Routes>
		</Suspense>
	)
}
