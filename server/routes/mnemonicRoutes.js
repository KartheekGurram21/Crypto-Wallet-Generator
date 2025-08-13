const router = require("express").Router();
const { generateMnemonicController } = require("../controllers/mnemonicsController");

router.get("/generate-mnemonics", generateMnemonic);

module.exports = router;