import { ThemeContext } from "../context/ThemeContext";
import { useContext } from "react";

export default function Footer() {
  const { darkMode } = useContext(ThemeContext);

  return (
    <footer
      className={`${
        darkMode ? "bg-gray-900 text-white border-gray-800" : "bg-gray-50 text-gray-900 border-gray-200"
      } w-full px-4 sm:px-6 lg:px-8 py-6 border-t mt-auto`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-2">
          <p className={`${darkMode ? "text-gray-300" : "text-gray-600"} text-sm`}>
            CryptoWallet Generator - developed by <a href="https://www.linkedin.com/in/kartheek-gurram-71a5aa258/" target="blank">Kartheek Gurram</a>
          </p>
          <p className={`${darkMode ? "text-gray-400" : "text-gray-500"} text-xs`}>
            This application is just a representation of how HDWALLETS work
          </p>
        </div>
      </div>
    </footer>
  );
}