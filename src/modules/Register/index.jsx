import Translate from "@/components/Translate"
import TextField from "@mui/material/TextField"
import { Link } from "react-router-dom"
import Checkbox from "@mui/material/Checkbox"
import FormControlLabel from "@mui/material/FormControlLabel"
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { registerToSystem } from "../Login/authAction"

export default function Register() {
	const dispatch = useDispatch()
	const form = useForm({
		defaultValues: {
			userName: "",
			email: "",
			password: "",
			isAgree: false,
		},
	})
	const { register, handleSubmit } = form

	const style = "w-3/5 mx-auto flex justify-center pt-5"

	async function onSubmit(data) {
		if (!data.isAgree) {
			console.log("IsAgree is: ", data.isAgree)
			// modal
		} else {
			dispatch(registerToSystem(data))
		}
	}

	return (
		<div className="bg-light-yellow h-screen">
			<div className="container mx-auto px-4 sm:px-6 lg:px-20">
				<div className="font-MF text-main-yellow text-5xl flex justify-center pt-10">G2U</div>
			</div>
			<div className="flex justify-center w-full">
				<div class="shadow-inner bg-white w-1/3">
					<form noValidate onSubmit={handleSubmit(onSubmit)}>
						<div className={style}>
							<TextField
								required
								fullWidth
								type="text"
								id="username"
								label="username"
								variant="outlined"
								placeholder="Enter your user name"
								{...register("userName")}
							/>
						</div>
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
						<div className="flex justify-center">
							<FormControlLabel
								required
								control={<Checkbox />}
								label="I agree to the terms & policy"
								{...register("isAgree")}
							/>
						</div>
						<div className="h-7 w-3/5 mx-auto flex justify-center rounded bg-main-yellow mt-3">
							<button type="submit" className="w-full">
								Sign Up
							</button>
						</div>
						<div className="w-3/5 mx-auto flex justify-evenly pt-5">
							<Translate text="Have an account?" />
							<Link to="/login">
								<button type="button">
									<p className="text-sign-up">Sign In</p>
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
