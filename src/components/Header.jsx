import { ToggleSwitch } from "./ToggleSwitch";
import { Moon, Sun } from "lucide-react";

export function Header({ darkMode, onToggleDarkMode }) {
    return (

        <header className={`${darkMode ? "bg-black text-white border-gray-800" : "bg-white text-gray-900 border-gray-200"} w-full px-4 sm:px-6 lg:px-8 py-4 border-b`}>
            <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center">
                <h1 className="text-xl sm:text-2xl font-bold">CryptoWallet Generator</h1>
            </div>
            <div className="flex items-center space-x-3">
                <Sun className="h-4 w-4 text-gray-500" />
                <ToggleSwitch
                checked={darkMode}
                onChange={onToggleDarkMode}
                ariaLabel="Toggle dark mode"
                />
                <Moon className="h-4 w-4 text-gray-500" />
            </div>
            </div>
        </header>
        );
}
