import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function Layout({ darkMode, toggleDarkMode }) {
    return (
        <div>
            <Header darkMode={darkMode} onToggleDarkMode={toggleDarkMode} />
            {/* <Outlet /> */}
            <Footer darkMode={darkMode} />
        </div>
    );
}