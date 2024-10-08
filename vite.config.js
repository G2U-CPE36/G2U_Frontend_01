import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import million from "million/compiler"
import path from "node:path"

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		million.vite({ auto: true }),
		react({
			include: /\.(mdx|js|jsx)$/,
		}),
	],
	resolve: {
		alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
	},
	esbuild: {
		loader: "jsx",
		include: /\.[jt]sx?$/,
		exclude: [],
	},
	optimizeDeps: {
		esbuildOptions: {
			loader: {
				".js": "jsx",
			},
		},
	},
})
