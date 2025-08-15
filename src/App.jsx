import Layout from "./components/Layout";
import { Routes, Route } from "react-router-dom";
import BlockchainSelector from "./views/BlockchainSelector";
import WalletGenerator from "./views/WalletGenerator";
import WalletDisplayer from "./views/WalletDisplayer";
import NotFound from "./views/NotFound";

export default function App() {
  const blockchains = ["bitcoin", "ethereum", "polygon", "solana", "sui", "base"];

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<BlockchainSelector />} />
        {blockchains.map((bc) => (
          <Route key={bc} path={bc} element={<WalletGenerator />} />
        ))}
        {blockchains.map((bc) => (
          <Route key={`${bc}-wallets`} path={`${bc}/wallets`} element={<WalletDisplayer />} />
        ))}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}