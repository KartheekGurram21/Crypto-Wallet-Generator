const { validateSeedPhrase } = require("../utils/validateMnemonics");

const mnemonicMiddleware = (req, res, next) => {
    const { mnemonics } = req.body;
    try {
        const result = validateSeedPhrase(mnemonics);
        if(!result) {
            return res.status(401).json({
                message: "Invalid mnemonics or seed phrase"
            });
        }
        next();
    } catch(err) {
        res.status(500).json({
            error: err.message || "Internal server error"
        });
    }
} 

module.exports = {
    mnemonicMiddleware
};