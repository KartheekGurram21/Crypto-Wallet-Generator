const bip39 = require("bip39");
const ed25519 = require("ed25519-hd-key");
const nacl = require("tweetnacl");
const { blake2b } = require("@noble/hashes/blake2b");

async function generateSuiKeys(mnemonics, accountIndex) {
    const seed = await bip39.mnemonicToSeed(mnemonics);
    const path = `m/44'/784'/${accountIndex}'/0'/0'`;
    const derived = ed25519.derivePath(path, seed.toString("hex")).key;
    const keyPair = nacl.sign.keyPair.fromSeed(derived);
    const publicKey = keyPair.publicKey;
    const suiAddress = "0x" + Buffer.from(blake2b(publicKey, { dkLen: 32 })).toString("hex");

    return {
        publicKey: Buffer.from(publicKey).toString("hex"),
        privateKey: Buffer.from(keyPair.secretKey).toString("hex"),
        address: suiAddress
    };
}

module.exports = { generateSuiKeys };