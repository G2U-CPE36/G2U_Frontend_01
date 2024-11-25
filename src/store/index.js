import { configureStore } from "@reduxjs/toolkit"
import authReducer from "@/modules/Login/authSlice"
import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"
// const data = useSelector((state) => state.${name})

const persistConfig = {
	key: "root",
	storage,
}

const persistedReducer = persistReducer(persistConfig, authReducer)

export const store = configureStore({
	reducer: { auth: persistedReducer },
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
})

export const persistor = persistStore(store)
