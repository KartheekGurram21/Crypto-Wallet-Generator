import { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";

export default function NotFound() {
	const { darkMode } = useContext(ThemeContext);

	return (
		<div
			className={`min-h-screen flex items-center justify-center px-6 py-12 ${
				darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
			}`}
		>
			<div
				className={`w-full max-w-2xl text-center rounded-2xl p-8 shadow-lg border ${
					darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
				}`}
			>
				<div className="mx-auto mb-6 w-32 h-32 relative">
					<div
						className={`absolute inset-0 rounded-full blur-2xl opacity-30 ${
							darkMode ? "bg-blue-500" : "bg-blue-400"
						}`}
					/>
					<svg
						viewBox="0 0 200 200"
						className="relative w-full h-full animate-bounce"
						aria-hidden="true"
					>
						<path
							d="M100 20c-33 0-60 27-60 60v30c0 14 11 25 25 25h70c14 0 25-11 25-25V80c0-33-27-60-60-60z"
							className={darkMode ? "fill-gray-700" : "fill-gray-100"}
						/>
						<circle
							cx="80"
							cy="90"
							r="8"
							className={darkMode ? "fill-white" : "fill-gray-800"}
						/>
						<circle
							cx="120"
							cy="90"
							r="8"
							className={darkMode ? "fill-white" : "fill-gray-800"}
						/>
						<path
							d="M75 120c10 8 40 8 50 0"
							stroke={darkMode ? "#fff" : "#111827"}
							strokeWidth="6"
							strokeLinecap="round"
							fill="none"
						/>
					</svg>
				</div>

				<p
					className={`inline-block mb-3 text-xs font-semibold tracking-widest uppercase rounded-full px-3 py-1 ${
						darkMode ? "bg-gray-700 text-gray-200" : "bg-gray-100 text-gray-700"
					}`}
				>
					Error 404
				</p>

				<h1 className="text-3xl sm:text-4xl font-extrabold mb-2">Page not found</h1>
				<p className={darkMode ? "text-gray-300" : "text-gray-600"}>
					The page you’re looking for doesn’t exist or was moved. Check the URL, or head back home.
				</p>

				<div className="mt-8 flex flex-wrap items-center justify-center gap-3">
					<Link
						to="/"
						className={`px-5 py-2.5 rounded-xl font-medium shadow transition ${
							darkMode
								? "bg-blue-600 hover:bg-blue-500 text-white"
								: "bg-blue-600 hover:bg-blue-700 text-white"
						}`}
					>
						Go Home
					</Link>
					<button
						onClick={() => window.history.back()}
						className={`px-5 py-2.5 rounded-xl font-medium transition border ${
							darkMode
								? "border-gray-600 text-gray-200 hover:bg-gray-700"
								: "border-gray-300 text-gray-700 hover:bg-gray-100"
						}`}
					>
						Go Back
					</button>
				</div>

				<div className="mt-8 text-sm">
					<code
						className={`px-2 py-1 rounded ${
							darkMode ? "bg-gray-700 text-gray-200" : "bg-gray-100 text-gray-700"
						}`}
					>
						404 — NotFound
					</code>
				</div>
			</div>
		</div>
	);
}
