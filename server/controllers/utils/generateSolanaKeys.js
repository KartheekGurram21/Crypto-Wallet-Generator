const bip39 = require("bip39");
const ed25519 = require("ed25519-hd-key");
const { Keypair } = require("@solana/web3.js");
const bs58 = require("bs58");

async function generateSolanaKeys(mnemonics, accountIndex) {
    const seed = await bip39.mnemonicToSeed(mnemonics);
    const path = `m/44'/501'/${accountIndex}'/0'`;
    const derived = ed25519.derivePath(path, seed.toString("hex")).key;
    const keyPair = Keypair.fromSeed(derived);

    const privateKey = bs58.default.encode(keyPair.secretKey);
    const publicKey = keyPair.publicKey.toBase58();

    return {
        publicKey: publicKey,
        privateKey: privateKey,
        address: publicKey
    }
}

module.exports = { generateSolanaKeys };
