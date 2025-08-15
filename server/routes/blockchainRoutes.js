const router = require("express").Router();
const { bitcoinController, ethereumController, suiController, solanaController } = require("../controllers/blockchainController");


router.post("/bitcoin", bitcoinController);
router.post("/ethereum", ethereumController);
router.post("/solana", solanaController);
router.post("/sui", suiController);
router.post("/base", ethereumController);
router.post("/polygon", ethereumController);

module.exports = router;