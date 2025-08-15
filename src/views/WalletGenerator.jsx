import { useState, useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

export default function WalletGenerator() {
    const { darkMode } = useContext(ThemeContext);
    const [seedPhrase, setSeedPhrase] = useState("");
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const location = useLocation();

    const selectedBlockchain = location.pathname;

    const bgClass = darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900";
    const cardBg = darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-300";
    const inputBg = darkMode
    ? "bg-gray-700 border-gray-600 text-white"
    : "bg-white border-gray-300 text-gray-900";
    const inputErrorBorder = "border-red-500 focus:ring-red-500";
    const buttonPrimary = "bg-blue-600 hover:bg-blue-700 text-white";
    const buttonSecondary = darkMode
    ? "bg-gray-700 hover:bg-gray-600 text-gray-300"
    : "bg-gray-100 hover:bg-gray-200 text-gray-700";
    const buttonDisabled = darkMode
    ? "bg-gray-600 text-gray-400 cursor-not-allowed"
    : "bg-gray-200 text-gray-400 cursor-not-allowed";

    const handleGenerate = async () => {
        try {
            const phrase = await axios.get("http://localhost:3001/api/mnemonics/generate-mnemonics");
            setSeedPhrase(phrase.data.data);
            setErrors({});
        } catch (err) {
            console.log(err);
        }
    };

    const handleImport = async () => {
        try {
            const result = await axios.post("http://localhost:3001/api/mnemonics/validate-mnemonics", 
                {
                mnemonics: seedPhrase
                }
            );
            if (!result) {
                throw new Error("invalid mnemonics, please enter valid mnemonics");
            }
            setErrors({});
            navigate(`${selectedBlockchain.toLowerCase()}/wallets`, 
                {
                    state: { seedPhrase }
                }
            );
        } catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                setErrors({ seedPhrase: err.response.data.message });
            } else {
                setErrors({ seedPhrase: err.message || "Something went wrong" });
            }
            console.log(err);
        }
    };

    const isImportDisabled =
    !(seedPhrase || "").trim() || !!(errors.seedPhrase && errors.seedPhrase.trim());


    return (
        <div className={`min-h-screen p-6 flex flex-col items-center ${bgClass}`}>
            <div className={`max-w-xl w-full rounded-xl shadow-lg border ${cardBg} p-6`}>
                <h2 className="text-2xl font-bold mb-4 text-center">Setup Your Wallet</h2>

                <label
                    htmlFor="seedPhrase"
                    className={`block mb-2 font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                >
                    Secret Recovery Phrase
                </label>

                <textarea
                    id="seedPhrase"
                    rows={4}
                    value={seedPhrase}
                    onChange={(e) => {
                    setSeedPhrase(e.target.value);
                    setErrors(prev => ({ ...prev, seedPhrase: "" })); // clear only seedPhrase error
                    }}
                    placeholder="Enter your 12-24 word seed phrase..."
                    className={`w-full p-3 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 resize-none ${inputBg} ${
                    errors.seedPhrase ? inputErrorBorder : ""
                    }`}
                />


                {errors.seedPhrase && <p className="mt-1 text-sm text-red-600">{errors.seedPhrase}</p>}

                <div className="flex justify-between mt-6 gap-4">
                    <button
                        type="button"
                        onClick={handleGenerate}
                        className={`flex-1 py-2 rounded-md font-semibold transition-colors duration-200 ${buttonPrimary}`}
                    >
                        Generate Random Phrase
                    </button>

                    <button
                        type="button"
                        onClick={handleImport}
                        disabled={isImportDisabled}
                        className={`flex-1 py-2 rounded-md font-semibold transition-colors duration-200 ${
                            isImportDisabled ? buttonDisabled : buttonSecondary
                        }`}
                    >
                        Import Wallet
                    </button>
                </div>
            </div>
        </div>
    );
}