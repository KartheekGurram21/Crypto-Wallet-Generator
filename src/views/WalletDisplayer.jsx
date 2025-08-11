import { useContext, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { BlockchainContext } from "../context/BlockchainContext";
import { generateKeyPairs } from "../utils/cryptoKeysGenerator";
import { useLocation } from "react-router-dom";
import { FiTrash2, FiPlus } from "react-icons/fi";

export default function WalletDisplayer() {
  let counter = 1;
  const location = useLocation();
  const { seedPhrase } = location.state || {};
  const words = seedPhrase ? seedPhrase.split(" ") : [];

  const { darkMode } = useContext(ThemeContext);
  const { selectedBlockchain } = useContext(BlockchainContext);

  const [visible, setVisible] = useState(true);
  const [copied, setCopied] = useState(false);

  // Multiple wallet state
  const [wallets, setWallets] = useState([
    { publicKey: "PUB_KEY_1", privateKey: "PRIV_KEY_1" },
  ]);

  const handleCopy = (e) => {
    if (e.target.closest("button")) return;
    if (visible) {
      navigator.clipboard.writeText(seedPhrase);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  // Add new wallet
  const handleAddWallet = () => {
    const {publicKey, privateKey} = generateKeyPairs(seedPhrase, counter, selectedBlockchain.name);
    setWallets([...wallets, {publicKey, privateKey}]);
    counter++;
  };

  // Delete specific wallet
  const handleDeleteWallet = (index) => {
    setWallets(wallets.filter((_, i) => i !== index));
  };

  // Delete all wallets
  const handleDeleteAll = () => {
    setWallets([]);
  };

  return (
    <div
      className={`w-full min-h-screen flex flex-col items-center px-4 py-8 space-y-6 ${
        darkMode ? "bg-gray-900" : "bg-gray-100"
      }`}
    >
      {/* Mnemonics Section */}
      <div
        className={`w-full sm:w-3/4 p-6 rounded-xl shadow-lg transition-all duration-300 ${
          darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
        }`}
        onClick={handleCopy}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl font-bold">
            {selectedBlockchain?.name || "Wallet"} Mnemonics
          </h2>
          <button
            onClick={() => setVisible(!visible)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300 ${
              darkMode
                ? "bg-gray-700 hover:bg-gray-600"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {visible ? "Hide" : "Show"}
          </button>
        </div>

        {/* Copy Notification */}
        {copied && (
          <div className="mb-2 text-green-400 text-sm font-medium animate-fade-in-out">
            ✅ Mnemonics copied to clipboard!
          </div>
        )}

        {/* Mnemonics Grid */}
        <div
          className={`cursor-pointer select-none grid grid-cols-3 sm:grid-cols-4 gap-3 w-full overflow-hidden transition-all duration-500 ease-in-out ${
            visible ? "max-h-[500px] opacity-100 mt-2" : "max-h-0 opacity-0 mt-0"
          }`}
        >
          {words.map((word, index) => (
            <div
              key={index}
              className={`flex items-center justify-center p-3 rounded-lg border text-base font-medium transition-colors ${
                darkMode
                  ? "bg-gray-700 border-gray-600 hover:bg-gray-600"
                  : "bg-gray-50 border-gray-300 hover:bg-gray-200"
              }`}
            >
              {index + 1}. {word}
            </div>
          ))}
        </div>

        {/* Copy Hint */}
        {visible && (
          <p className="text-xs text-center text-gray-400 mt-3">
            💡 Click anywhere on the mnemonics to copy them
          </p>
        )}
      </div>

      {/* Wallets Container */}
      <div
        className={`w-full sm:w-3/4 p-6 rounded-xl shadow-lg transition-all duration-300 ${
          darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
        }`}
      >
        {/* Wallet Controls */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            {selectedBlockchain?.name || "Wallet"} Keys
          </h2>
          <div className="flex gap-2">
            <button
              onClick={handleAddWallet}
              className={`flex items-center gap-1 px-3 py-1 rounded-lg text-sm font-medium transition-colors duration-300 ${
                darkMode
                  ? "bg-green-700 hover:bg-green-600"
                  : "bg-green-200 hover:bg-green-300"
              }`}
            >
              <FiPlus /> Add Wallet
            </button>
            <button
              onClick={handleDeleteAll}
              className={`flex items-center gap-1 px-3 py-1 rounded-lg text-sm font-medium transition-colors duration-300 ${
                darkMode
                  ? "bg-red-700 hover:bg-red-600"
                  : "bg-red-200 hover:bg-red-300"
              }`}
            >
              <FiTrash2 /> Delete All
            </button>
          </div>
        </div>

        {/* Wallet Cards */}
        <div className="grid sm:grid-cols-2 gap-4">
          {wallets.map((wallet, index) => (
            <div
              key={index}
              className={`relative p-4 rounded-lg border text-sm break-all ${
                darkMode
                  ? "bg-gray-700 border-gray-600"
                  : "bg-gray-50 border-gray-300"
              }`}
            >
              {/* Delete Icon */}
              <button
                onClick={() => handleDeleteWallet(index)}
                className="absolute top-2 right-2 text-red-400 hover:text-red-600"
              >
                <FiTrash2 />
              </button>

              {/* Public Key */}
              <div
                className={`mb-2 ${
                  darkMode ? "text-green-300" : "text-green-700"
                }`}
              >
                <span className="font-bold">Public Key:</span> {wallet.publicKey}
              </div>

              {/* Private Key */}
              <div
                className={`${
                  darkMode ? "text-red-300" : "text-red-700"
                }`}
              >
                <span className="font-bold">Private Key:</span>{" "}
                {wallet.privateKey}
              </div>
            </div>
          ))}

          {wallets.length === 0 && (
            <p className="text-center text-gray-400 col-span-full">
              No wallets available. Click "Add Wallet" to create one.
            </p>
          )}
        </div>
      </div>

      {/* Animation Styles */}
      <style>
        {`
          @keyframes fadeInOut {
            0%, 100% { opacity: 0; transform: translateY(-10px); }
            10%, 90% { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in-out {
            animation: fadeInOut 1.5s ease-in-out;
          }
        `}
      </style>
    </div>
  );
}
