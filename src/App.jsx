import { useContext } from "react";
import { ThemeContext } from "./context/ThemeContext";
import Layout from "./components/Layout";
import { Routes, Route } from 'react-router-dom';
import BlockchainSelector from "./views/BlockchainSelector";
import WalletGenerator from "./views/WalletGenerator";
import { Buffer } from 'buffer';

window.Buffer = Buffer;


export default function App() {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<BlockchainSelector />} />
          <Route path="bitcoin" element={<WalletGenerator />} />
          <Route path="ethereum" element={<WalletGenerator />} />
          <Route path="polygon" element={<WalletGenerator />} />
          <Route path="solana" element={<WalletGenerator />} />
          <Route path="sui" element={<WalletGenerator />} />
          <Route path="base" element={<WalletGenerator />} />
        </Route>
      </Routes>
    </>
  )
}