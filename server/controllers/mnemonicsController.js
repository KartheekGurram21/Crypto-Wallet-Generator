const { generateMnemonic } = require("../utils/mnemonicGenerator");
const { validateSeedPhrase } = require("../utils/validateMnemonics");

const generateMnemonicController = async (req, res) => {
    try {
        const mnemonics = generateMnemonic();
        console.log(mnemonics);
        res.status(200).json({
            message: "mnemonic generated successfully",
            data: mnemonics
        });
    } catch(err) {
        res.status(500).json({
            error: err.message || "Internal server error"
        });
        console.log(err)
    }
}

const validateMnemonics = async (req, res) => {
    try {
        console.log(req.body)
        const { mnemonics } = req.body;
        const result = validateSeedPhrase(mnemonics);
        if(result.status) {
            return res.status(401).json({
                message: "Invalid mnemonics or seed phrase"
            });
        }
        return res.status(200).json({
            message: "Valid seed phrase"
        });
    } catch(err) {
        res.status(500).json({
            error: err.message || "Internal server error"
        });
        console.log(err);
    }
}

module.exports = {
    generateMnemonicController,
    validateMnemonics
};