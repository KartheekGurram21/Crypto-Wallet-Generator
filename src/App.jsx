import { useContext } from "react";
import { ThemeContext } from "./context/ThemeContext";
import Layout from "./components/Layout";
import { Routes, Route } from 'react-router-dom';
import BlockchainSelector from "./views/BlockchainSelector";


export default function App() {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<BlockchainSelector />} />
        </Route>
      </Routes>
    </>
  )
}