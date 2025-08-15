const bip39 = require("bip39");
const ecc = require("tiny-secp256k1");
const { BIP32Factory } = require("bip32");
const bitcoin = require("bitcoinjs-lib");
const bs58 = require("bs58");
const bip32 = BIP32Factory(ecc);

async function generateBitcoinKeys(mnemonics, accountIndex) {
    const seed = await bip39.mnemonicToSeed(mnemonics);
    const root = bip32.fromSeed(seed, bitcoin.networks.bitcoin);
    const path = `m/44'/0'/${accountIndex}'/0/0`;
    const child = root.derivePath(path);
    const privateKey = child.toWIF();
    const publicKey = bs58.default.encode(Buffer.from(child.publicKey));

    const { address } = bitcoin.payments.p2pkh({
        pubkey: Buffer.from(child.publicKey),
        network: bitcoin.networks.bitcoin
    });

    return { 
        publicKey: publicKey,
        privateKey: privateKey,
        address: address
    };
}

module.exports = { generateBitcoinKeys };