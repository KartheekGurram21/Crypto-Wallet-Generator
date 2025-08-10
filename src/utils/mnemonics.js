import * as bip39 from 'bip39';

export function validateSeedPhrase(phrase) {
  const trimmed = phrase.trim();
  const newErrors = {};

  if (!trimmed) {
    newErrors.seedPhrase = "Seed phrase is required";
  } else if (!bip39.validateMnemonic(trimmed)) {
    newErrors.seedPhrase = "Invalid seed phrase";
  }

  return newErrors;
}

// Also export these if you want
export function generateMnemonic() {
  return bip39.generateMnemonic();
}

export function validateMnemonic(mnemonic) {
  return bip39.validateMnemonic(mnemonic);
}
