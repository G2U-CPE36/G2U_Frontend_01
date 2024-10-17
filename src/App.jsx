import Router from "@/router"
import NavigationBar from "@/components/NavBar"
import { BrowserRouter } from "react-router-dom"

function App() {
	return (
		<BrowserRouter>
			<NavigationBar />
			<Router />
		</BrowserRouter>
	)
}

export default App
