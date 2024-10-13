import Translate from "@/components/Translate"
import TextField from "@mui/material/TextField"
import { useState } from "react"
import { Link } from "react-router-dom"

export default function Login() {
	const style = "w-3/5 mx-auto flex justify-center pt-5"

	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")

	function handleSubmit(e) {
		e.preventDefault()
		console.log("Email:", email)
		console.log("Password:", password)
	}

	return (
		<div className="bg-light-yellow h-screen">
			<div className="container mx-auto px-4 sm:px-6 lg:px-20">
				<div className="font-MF text-main-yellow text-5xl flex justify-center pt-10">G2U</div>
			</div>
			<div className="flex justify-center w-full">
				<div class="shadow-inner bg-white w-1/3">
					<form onSubmit={handleSubmit}>
						<div className={style}>
							<TextField
								required
								fullWidth
								type="email"
								id="email"
								label={<Translate text="email" />}
								variant="outlined"
								placeholder="Enter your email"
								onChange={(e) => setEmail(e.target.value)}
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
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>
						<div className="h-7 w-3/5 mx-auto flex justify-center rounded bg-main-yellow mt-3">
							<button type="submit">Login</button>
						</div>
						<div className="w-3/5 mx-auto flex justify-evenly pt-5">
							<Translate text="Don’t have an account?" />
							<Link>
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
