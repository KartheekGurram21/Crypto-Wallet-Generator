const { generateMnemonic } = require("../utils/mnemonicGenerator");

const generateMnemonicController = async (req, res) => {
    try {
        const mnemonics = generateMnemonic();
        res.status(200).json({
            message: "mnemonic generated successfully",
            data: mnemonics
        });
    } catch(err) {
        res.status(500).json({
            error: err.message || "Internal server error"
        });
    }
}

module.exports = {
    generateMnemonicController
};