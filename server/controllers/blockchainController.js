const { generateBitcoinKeys } = require("../utils/generateBitcoinKeys");
const { generateEthereumKeys } = require("../utils/generateEthereumKeys");
const { generateSolanaKeys } = require("../utils/generateSolanaKeys");
const { generateSuiKeys } = require("../utils/generateSuiKeys");

const bitcoinController = async (req, res) => {
    try {
        const { mnemonics, accountIndex } = req.body;
        const result = await generateBitcoinKeys(mnemonics, accountIndex);
        res.status(200).json({
            message: "generated bitcoin keys successfully",
            data: result
        });
    } catch(err) {
        res.status(500).json({
            error: err.message || "Internal server error"
        });
    }
}

const ethereumController = async (req, res) => {
   try {
        const { mnemonics, accountIndex } = req.body;
        const result = await generateEthereumKeys(mnemonics, accountIndex);
        res.status(200).json({
            message: "generated bitcoin keys successfully",
            data: result
        });
   } catch(err) {
        res.status(500).json({
            error: err.message || "Internal server error"
        });
   } 
}

const solanaController = async (req, res) => {
   try {
        const { mnemonics, accountIndex } = req.body;
        const result = await generateSolanaKeys(mnemonics, accountIndex);
        res.status(200).json({
            message: "generated bitcoin keys successfully",
            data: result
        });
   } catch(err) {
        res.status(500).json({
            error: err.message || "Internal server error"
        });
   } 
}

const suiController = async (req, res) => {
   try {
        const { mnemonics, accountIndex } = req.body;
        const result = await generateSuiKeys(mnemonics, accountIndex);
        res.status(200).json({
            message: "generated bitcoin keys successfully",
            data: result
        });
   } catch(err) {
        res.status(500).json({
            error: err.message || "Internal server error"
        });
   } 
}

module.exports = {
    bitcoinController,
    ethereumController,
    solanaController,
    suiController
};