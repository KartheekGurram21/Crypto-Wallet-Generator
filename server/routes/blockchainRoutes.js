const router = require("express").Router();

router.get("/blockchain/bitcoin", generateBitcoinKeys());