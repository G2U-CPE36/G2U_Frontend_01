import Translate from "@/components/Translate"
import TextField from "@mui/material/TextField"
import { Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { loginToSystem } from "./authAction"
import { useLocation, useNavigate } from "react-router-dom"

export default function Login() {
	const style = "w-3/5 mx-auto flex justify-center pt-5"
	const dispatch = useDispatch()
	const location = useLocation()
	const navigate = useNavigate()
	const from = location.state?.from || "/"

	const form = useForm({
		defaultValues: {
			email: "",
			password: "",
		},
	})

	const { register, handleSubmit } = form

	async function onSubmit(data) {
		try {
			// Dispatch the login action and wait for it to complete
			const resultAction = await dispatch(loginToSystem(data)).unwrap()

			// If login is successful, navigate to the desired page
			if (resultAction?.token) {
				navigate(from)
			}
		} catch (error) {
			// If login fails, handle the error (e.g., show a message)
			console.error("Login failed:", error)
			alert(error.message || "Login failed. Please try again.")
		}
	}

	return (
		<div className="bg-light-yellow h-screen">
			<div className="container mx-auto px-4 sm:px-6 lg:px-20">
				<div className="font-MF text-main-yellow text-5xl flex justify-center pt-10">G2U</div>
			</div>
			<div className="flex justify-center w-full">
				<div class="shadow-inner bg-white w-1/3">
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className={style}>
							<TextField
								required
								fullWidth
								type="email"
								id="email"
								label={<Translate text="email" />}
								variant="outlined"
								placeholder="Enter your email"
								{...register("email")}
							/>
						</div>
						<div className={style}>
							<TextField
								required
								fullWidth
								id="password"
								type="password"
								label={<Translate text="password" />}
								variant="outlined"
								placeholder="Enter your password"
								{...register("password")}
							/>
						</div>
						<div className="h-7 w-3/5 mx-auto flex justify-center rounded bg-main-yellow mt-3">
							<button type="submit" className="w-full">
								Login
							</button>
						</div>
						<div className="h-7 w-3/5 mx-auto flex justify-center rounded bg-main-yellow mt-3">
							<button type="button" className="w-full" onClick={() => dispatch(testTriggerAuth())}>
								Trigger Auth
							</button>
						</div>
						<div className="w-3/5 mx-auto flex justify-evenly pt-5">
							<Translate text="Don’t have an account?" />
							<Link to="/register">
								<button type="button">
									<p className="text-sign-up">Sign Up</p>
								</button>
							</Link>
						</div>
						<div className="w-3/5 mx-auto flex items-center justify-center">
							<div className="border-t border-black flex-grow"> </div>
							<span className="mx-4 text-black text-2xl">OR</span>
							<div className="border-t border-black flex-grow"> </div>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}
