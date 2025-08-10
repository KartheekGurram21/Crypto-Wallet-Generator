import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export function ToggleSwitch({ ariaLabel }) {

  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  return (
    <button
      type="button"
      role="switch"
      aria-checked={darkMode}
      aria-label={ariaLabel}
      onClick={() => toggleDarkMode()}
      className={`
        relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900
        ${darkMode 
          ? 'bg-blue-600 dark:bg-blue-500' 
          : 'bg-gray-200 dark:bg-gray-700'
        }
      `}
    >
      <span
        className={`
          inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ease-in-out
          ${darkMode ? 'translate-x-6' : 'translate-x-1'}
        `}
      />
    </button>
  );
}