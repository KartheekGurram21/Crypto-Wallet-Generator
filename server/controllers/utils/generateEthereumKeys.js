const bip39 = require("bip39");
const hdkey = require("hdkey");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { toHex } = require("ethereum-cryptography/utils");

async function generateEthereumKeys(mnemonics, accountIndex) {
    const seed = await bip39.mnemonicToSeed(mnemonics);
    const root = hdkey.fromMasterSeed(seed);
    const path = `m/44'/60'/${accountIndex}'/0/0`;
    const child = root.derive(path);

    const privateKey = child.privateKey;
    const publicKey = child.publicKey;
    const address = "0x" + toHex(keccak256(publicKey.slice(1)).slice(-20));

    return {
        publicKey: toHex(publicKey),
        privateKey: toHex(privateKey),
        address: address
    };
}


module.exports = { generateEthereumKeys };
