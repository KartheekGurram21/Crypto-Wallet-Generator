import { useState } from "react";

export default function MnemonicDisplayer({ seedPhrase, blockchain, darkMode }) {
    const [mnemonicVisible, setMnemonicVisible] = useState(false);
    const [copiedMnemonic, setCopiedMnemonic] = useState(false);

    const words = seedPhrase ? seedPhrase.split(" ") : [];

    const handleCopyMnemonics = (e) => {
    if (e.target.closest("button")) return;
    if (!mnemonicVisible) return;
    navigator.clipboard.writeText(seedPhrase);
    setCopiedMnemonic(true);
    setTimeout(() => setCopiedMnemonic(false), 1500);
    };

    return (
        <div
            className={`w-full sm:w-3/4 p-6 rounded-xl shadow-lg ${
            darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
            }`}
        >
            <div className="flex justify-between items-center mb-3">
                <h2 className="text-xl font-bold">{blockchain || "Wallet"} Mnemonics</h2>
                <button
                    onClick={() => setMnemonicVisible(!mnemonicVisible)}
                    className={`px-4 py-2 rounded-lg text-sm ${
                    darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-200 hover:bg-gray-300"
                    }`}
                >
                    {mnemonicVisible ? "Hide" : "Show"}
                </button>
            </div>

            {copiedMnemonic && (
                <div className="mb-2 text-green-400 text-sm font-medium animate-fade-in-out">
                    ✅ Mnemonics copied!
                </div>
            )}

            <div
            onClick={handleCopyMnemonics}
            className={`cursor-pointer select-none grid grid-cols-3 sm:grid-cols-4 gap-3 w-full overflow-hidden transition-all duration-500 ease-in-out ${
                mnemonicVisible ? "max-h-[500px] opacity-100 mt-2" : "max-h-0 opacity-0 mt-0"
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

            {mnemonicVisible && (
            <p className="text-xs text-center text-gray-400 mt-3">
                💡 Click anywhere on the mnemonics to copy them
            </p>
            )}
        </div>
    );
}