import { useContext } from "react";
import { ThemeContext } from "./context/ThemeContext";
import Layout from "./components/Layout";


export default function App() {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);

  return (
    <>
      <Layout darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
    </>
  )
}