import { configureStore } from "@reduxjs/toolkit"
import authReducer from "@/modules/Login/authSlice"

// const data = useSelector((state) => state.${name})
export const store = configureStore({
	reducer: { auth: authReducer },
})
