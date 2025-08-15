import { useContext, useState } from "react";
import { blockchains } from "../utils/blockchainInfo";
import { ThemeContext } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import BlockchainCard from "../components/BlockchainCard";

export default function BlockchainSelector() {
    const [selectedBlockchain, setSelectedBlockchain] = useState(null);
    const { darkMode } = useContext(ThemeContext);
    const navigate = useNavigate();

    const handleSubmit = () => {
        if (selectedBlockchain) {
            navigate(`/${selectedBlockchain.name.toLowerCase()}`);
        }
    };

    return (
        <div
            className={`w-full px-4 sm:px-6 lg:px-8 min-h-screen pb-4 ${
            darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
            }`}
        >
            <div className="text-center mb-8">
                <h2
                    className={`text-3xl font-bold mb-4 pt-4 ${
                    darkMode ? "text-white" : "text-gray-900"
                    }`}
                >
                    Select a Blockchain
                </h2>
                <p
                    className={`text-lg ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                >
                    Choose your preferred blockchain to generate a new wallet
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {blockchains.map((blockchain) => (
                    <BlockchainCard
                    key={blockchain.id}
                    blockchain={blockchain}
                    darkMode={darkMode}
                    isSelected={
                        selectedBlockchain && selectedBlockchain.id === blockchain.id
                    }
                    onSelect={setSelectedBlockchain}
                    />
                ))}
            </div>

            {selectedBlockchain && (
            <div className="text-center mt-8">
                <button
                className={`font-semibold py-3 px-8 rounded-lg shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-105 ${
                    darkMode
                    ? "bg-blue-500 hover:bg-blue-400 text-white"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
                onClick={handleSubmit}
                >
                Continue with {selectedBlockchain.name}
                </button>
            </div>
            )}
        </div>
    );
}