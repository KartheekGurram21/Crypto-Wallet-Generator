import { createContext, useState } from "react";

export const BlockchainContext = createContext();

export function BlockchainProvider({ children }) {
    const [selectedBlockchain, setSelectedBlockchain] = useState(null);

    const handleBlockchain = (blockchain) => {
        setSelectedBlockchain(blockchain);
    }

    return (
        <BlockchainContext.Provider value={{ selectedBlockchain, handleBlockchain }}>
            {children}
        </BlockchainContext.Provider>
    );
}