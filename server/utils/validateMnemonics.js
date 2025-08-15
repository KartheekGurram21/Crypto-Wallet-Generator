const bip39 = require("bip39");

function validateSeedPhrase(phrase) {
  const trimmed = phrase.trim();
  const newErrors = {};

  if (!trimmed) {
    newErrors.seedPhrase = "Seed phrase is required";
  } else if (!bip39.validateMnemonic(trimmed)) {
    newErrors.seedPhrase = "Invalid seed phrase";
  }

  return {
    errors: newErrors,
    status: Object.keys(newErrors).length > 0 ? true : false
  };
}


function validateMnemonic(mnemonic) {
  return bip39.validateMnemonic(mnemonic);
}


module.exports = {
    validateSeedPhrase,
    validateMnemonic
};