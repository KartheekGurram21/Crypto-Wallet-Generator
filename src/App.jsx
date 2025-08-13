import Layout from "./components/Layout";
import { Routes, Route } from 'react-router-dom';
import BlockchainSelector from "./views/BlockchainSelector";
import WalletGenerator from "./views/WalletGenerator";
import WalletDisplayer from "./views/WalletDisplayer";


export default function App() {

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
          <Route path="bitcoin/wallets" element={<WalletDisplayer />} />
          <Route path="ethereum/wallets" element={<WalletDisplayer />} />
          <Route path="polygon/wallets" element={<WalletDisplayer />} />
          <Route path="solana/wallets" element={<WalletDisplayer />} />
          <Route path="sui/wallets" element={<WalletDisplayer />} />
          <Route path="base/wallets" element={<WalletDisplayer />} />
          
        </Route>
      </Routes>
    </>
  )
}