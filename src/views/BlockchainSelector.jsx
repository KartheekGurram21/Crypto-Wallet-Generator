import { useContext, useState } from 'react';
import { blockchains } from '../utils/blockchainInfo';
import { ThemeContext } from '../context/ThemeContext';

export default function BlockchainSelector() {

    const { darkMode } = useContext(ThemeContext);
    const [selectedBlockchain, setSelectedBlockChain] = useState();

    const handleSelect = (value) => {
        setSelectedBlockChain(value.id);
    };

    return (
        <div
            className={`w-full px-4 sm:px-6 lg:px-8 min-h-screen pb-4 ${
                darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
            }`}
            >

                <div className="text-center mb-8">
                <h2
                    className={`text-3xl font-bold mb-4 pt-4 ${
                    darkMode ? 'text-white' : 'text-gray-900'
                    }`}
                >
                    Select a Blockchain
                </h2>
                <p
                    className={`text-lg ${
                    darkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}
                >
                    Choose your preferred blockchain to generate a new wallet
                </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {blockchains.map((blockchain) => {
                    const isSelected = selectedBlockchain === blockchain.id;
                    return (
                    <div
                        key={blockchain.id}
                        className={`relative rounded-xl shadow-lg border-2 transition-all duration-200 cursor-pointer hover:shadow-xl hover:scale-105 ${
                        darkMode ? 'bg-gray-800' : 'bg-white'
                        } ${
                        isSelected
                            ? darkMode
                            ? 'border-blue-500 ring-2 ring-blue-800'
                            : 'border-blue-500 ring-2 ring-blue-200'
                            : darkMode
                            ? 'border-gray-700 hover:border-gray-600'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => handleSelect(blockchain)}
                    >
                        <div className="p-6">
                        {/* Icon */}
                        <div
                            className={`w-16 h-16 rounded-full ${blockchain.color} flex items-center justify-center mb-4 mx-auto`}
                        >
                            <span className="text-white text-2xl font-bold">
                            {blockchain.icon}
                            </span>
                        </div>

                        {/* Content */}
                        <div className="text-center">
                            <h3
                            className={`text-xl font-semibold mb-1 ${
                                darkMode ? 'text-white' : 'text-gray-900'
                            }`}
                            >
                            {blockchain.name}
                            </h3>
                            <p
                            className={`text-sm mb-2 ${
                                darkMode ? 'text-gray-400' : 'text-gray-500'
                            }`}
                            >
                            {blockchain.symbol}
                            </p>
                            <p
                            className={`text-sm mb-4 ${
                                darkMode ? 'text-gray-300' : 'text-gray-600'
                            }`}
                            >
                            {blockchain.description}
                            </p>

                            {/* Custom Button */}
                            <button
                            className={`w-full py-2 px-4 rounded-lg font-medium transition-all duration-200 ${
                                isSelected
                                ? darkMode
                                    ? 'bg-blue-600 text-white shadow-md hover:bg-blue-500'
                                    : 'bg-blue-600 text-white shadow-md hover:bg-blue-700'
                                : darkMode
                                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                            onClick={(e) => {
                                e.stopPropagation();
                                handleSelect(blockchain);
                            }}
                            >
                            {isSelected ? 'Selected' : 'Select'}
                            </button>
                        </div>

                        {/* Selected indicator */}
                        {isSelected && (
                            <div className="absolute top-3 right-3">
                            <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                                <svg
                                className="w-4 h-4 text-white"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                >
                                <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                />
                                </svg>
                            </div>
                            </div>
                        )}
                        </div>
                    </div>
                    );
                })}
                </div>

                {/* Continue Button */}
                {selectedBlockchain && (
                <div className="text-center mt-8">
                    <button
                    className={`font-semibold py-3 px-8 rounded-lg shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-105 ${
                        darkMode
                        ? 'bg-blue-500 hover:bg-blue-400 text-white'
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                    >
                    Continue with{' '}
                    {blockchains.find((b) => b.id === selectedBlockchain)?.name}
                    </button>
                </div>
                )}
            </div>
    );
}
