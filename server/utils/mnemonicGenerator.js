const bip39 = require("bip39");

function generateMnemonic() {
  return bip39.generateMnemonic();
}

module.exports = { generateMnemonic };