const router = require("express").Router();
const { bitcoinController, ethereumController, suiController, solanaController } = require("../controllers/blockchainController");


router.get("/bitcoin", bitcoinController);
router.get("/ethereum", ethereumController);
router.get("/solana", solanaController);
router.get("/sui", suiController);
router.get("/base", ethereumController);
router.get("/polygon", ethereumController);

module.exports = router;