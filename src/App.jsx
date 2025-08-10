import { useContext } from "react";
import { Header } from "./components/Header"
import { ThemeContext } from "./context/ThemeContext";


export default function App() {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);

  return (
    <>
      <Header darkMode={darkMode} onToggleDarkMode={toggleDarkMode}/>
    </>
  )
}