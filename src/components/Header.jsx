import { useContext } from "react";
import { ToggleSwitch } from "./ToggleSwitch";
import { Moon, Sun } from "lucide-react";
import { ThemeContext } from "../context/ThemeContext";

export default function Header() {
    const { darkMode } = useContext(ThemeContext);

    return (
        <header
            id="site-header"
            className={`${
                darkMode
                    ? "bg-gray-900 text-white border-gray-800"
                    : "bg-gray-50 text-gray-900 border-gray-200"
            } w-full px-4 sm:px-6 lg:px-8 py-4 border-b`}
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <div className="flex items-center">
                    <h1 className="text-xl sm:text-2xl font-bold">CryptoWallet Generator</h1>
                </div>
                <div className="flex items-center space-x-3">
                    <Sun className="h-4 w-4 text-gray-500" />
                    <ToggleSwitch ariaLabel="Toggle dark mode" />
                    <Moon className="h-4 w-4 text-gray-500" />
                </div>
            </div>
        </header>
    );
}
