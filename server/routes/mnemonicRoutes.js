const router = require("express").Router();
const { generateMnemonicController, validateMnemonics } = require("../controllers/mnemonicsController");

router.get("/generate-mnemonics", generateMnemonicController );
router.post("/validate-mnemonics", validateMnemonics);

module.exports = router;