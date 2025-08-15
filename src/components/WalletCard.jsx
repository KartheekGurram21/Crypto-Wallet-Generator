import { useState } from "react";
import { FiTrash2, FiCopy } from "react-icons/fi";

export default function WalletCard({ wallet, index, darkMode, onDelete }) {
    const [visibleKeys, setVisibleKeys] = useState(false);
    const [copyStatus, setCopyStatus] = useState({});

    const toggleKeyVisibility = () => {
        setVisibleKeys((prev) => !prev);
    };

    const copyToClipboard = (text, type) => {
        navigator.clipboard.writeText(text);
        setCopyStatus((prev) => ({ ...prev, [type]: "Copied!" }));
        setTimeout(() => {
            setCopyStatus((prev) => ({ ...prev, [type]: "" }));
        }, 1500);
    };

    return (
        <div
            className={`relative p-4 rounded-lg border ${
            darkMode ? "bg-gray-700 border-gray-600" : "bg-gray-50 border-gray-300"
            }`}
        >
            <button
            onClick={() => onDelete(index)}
            className="absolute top-2 right-2 text-red-400 hover:text-red-600"
            >
                <FiTrash2 />
            </button>

            <div
            className={`mb-2 ${darkMode ? "text-green-300" : "text-green-700"} font-mono text-xs sm:text-sm`}
            >
                <div className="font-bold mb-1">Public Key:</div>
                    <div className="flex items-start gap-2">
                        <span className="flex-1 break-all">{wallet.publicKey}</span>
                        <button
                        onClick={() => copyToClipboard(wallet.publicKey, "public")}
                        className="shrink-0 text-blue-400 hover:text-blue-600"
                        >
                        <FiCopy />
                        </button>
                        {copyStatus.public && (
                        <span className="text-green-400 text-[11px]">{copyStatus.public}</span>
                        )}
                    </div>
                </div>

                <div className={`${darkMode ? "text-red-300" : "text-red-700"} font-mono text-xs sm:text-sm`}>
                    <div className="font-bold mb-1">Private Key:</div>
                    <div className="flex items-start gap-2">
                        <span className="flex-1 break-all">
                            {visibleKeys ? wallet.privateKey : "*".repeat(wallet.privateKey.length)}
                        </span>
                        <button
                        onClick={() => copyToClipboard(wallet.privateKey, "private")}
                        className="shrink-0 text-blue-400 hover:text-blue-600"
                        >
                            <FiCopy />
                        </button>
                        {copyStatus.private && (
                            <span className="text-green-400 text-[11px]">{copyStatus.private}</span>
                        )}
                    </div>
                </div>

            <button
            onClick={toggleKeyVisibility}
            className={`mt-3 px-3 py-1 rounded-lg text-xs ${
                darkMode ? "bg-gray-600 hover:bg-gray-500" : "bg-gray-200 hover:bg-gray-300"
            }`}
            >
                {visibleKeys ? "Hide Key" : "Show Key"}
            </button>
        </div>
    );
}