import { useContext, useState, useEffect, useRef } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { useLocation, useNavigate } from "react-router-dom";
import { FiTrash2, FiPlus } from "react-icons/fi";
import axios from "axios";
import MnemonicDisplayer from "../components/MnemonicDisplayer";
import WalletCard from "../components/WalletCard";

export default function WalletDisplayer() {
    const navigate = useNavigate();
    const location = useLocation();
    const { seedPhrase } = location.state || {};
    const blockchain = location.pathname.split("/")[1];
    const { darkMode } = useContext(ThemeContext);

    const [wallets, setWallets] = useState(() => {
        const saved = localStorage.getItem("wallets");
        return saved ? JSON.parse(saved) : [];
    });
    const [counter, setCounter] = useState(() => Number(localStorage.getItem("counter")) || 0);
    const hasFetched = useRef(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        localStorage.setItem("wallets", JSON.stringify(wallets));
    }, [wallets]);

    useEffect(() => {
        if (!seedPhrase) {
            navigate("/");
            return;
        }

        if (!hasFetched.current) {
            hasFetched.current = true;
            if (wallets.length === 0) {
                (async () => {
                    try {
                        setLoading(true);
                        const res = await axios.post(`http://localhost:3001/api/blockchains/${blockchain}`,
                            { 
                                mnemonics: seedPhrase, 
                                accountIndex: counter 
                            }
                        );
                        setWallets([res.data.data]);
                        setCounter((p) => p + 1);
                    } catch (e) {
                        console.error("Error creating first wallet:", e);
                    } finally {
                        setLoading(false);
                    }
                })();
            }
        }
    }, [seedPhrase, blockchain, navigate]); 


    const handleAddWallet = async () => {
        try {
            setLoading(true);
            const res = await axios.post(`http://localhost:3001/api/blockchains/${blockchain}`,
                { 
                    mnemonics: seedPhrase, 
                    accountIndex: counter 
                }
            );
            setWallets((prev) => [...prev, res.data.data]);
            setCounter((p) => p + 1);
        } catch (e) {
            console.error("Error adding wallet:", e);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteWallet = (index) => {
        setWallets((prev) => prev.filter((_, i) => i !== index));
    };

    const handleDeleteAll = () => {
        setWallets([]);
        localStorage.removeItem("wallets");
    };

    return (
        <div
            className={`w-full min-h-screen flex flex-col items-center px-4 py-8 space-y-6 ${
            darkMode ? "bg-gray-900" : "bg-gray-100"
            }`}
        >

            {loading && (
            <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
            )}

            <MnemonicDisplayer seedPhrase={seedPhrase} blockchain={blockchain} darkMode={darkMode} />

            <div
            className={`w-full sm:w-3/4 p-6 rounded-xl shadow-lg ${
                darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
            }`}
            >
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">{blockchain || "Wallet"} Keys</h2>
                        <div className="flex gap-2">
                            <button
                                onClick={handleAddWallet}
                                disabled={loading}
                                className={`flex items-center gap-1 px-3 py-1 rounded-lg text-sm ${
                                darkMode
                                    ? "bg-green-700 hover:bg-green-600 disabled:opacity-50"
                                    : "bg-green-200 hover:bg-green-300 disabled:opacity-50"
                                }`}
                            >
                                <FiPlus /> Add Wallet
                            </button>
                            <button
                                onClick={handleDeleteAll}
                                className={`flex items-center gap-1 px-3 py-1 rounded-lg text-sm ${
                                darkMode ? "bg-red-700 hover:bg-red-600" : "bg-red-200 hover:bg-red-300"
                                }`}
                            >
                                <FiTrash2 /> Delete All
                            </button>
                        </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                    {wallets.map((wallet, index) => (
                        <WalletCard
                            key={index}
                            wallet={wallet}
                            index={index}
                            darkMode={darkMode}
                            onDelete={handleDeleteWallet}
                        />
                    ))}

                    {wallets.length === 0 && (
                        <p className="text-center text-gray-400 col-span-full">
                            No wallets yet. Click "Add Wallet".
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}