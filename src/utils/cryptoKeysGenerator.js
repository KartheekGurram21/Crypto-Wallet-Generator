import * as bip39 from "bip39";
import * as ecc from "tiny-secp256k1";
import BIP32Factory from "bip32";
import * as bitcoin from "bitcoinjs-lib";
import hdkey from "hdkey";
import { keccak256 } from "ethereum-cryptography/keccak.js";
import { bytesToHex } from "ethereum-cryptography/utils.js";

const bip32 = BIP32Factory(ecc);

export function generateKeyPairs(blockchain) {
    // 1. Generate mnemonic & seed
    const mnemonic = bip39.generateMnemonic();
    const seed = bip39.mnemonicToSeedSync(mnemonic);

    // 2. Detect blockchain & set derivation path
    let slip;
    switch (blockchain.toLowerCase()) {
        case "bitcoin":
            slip = 0; // BTC SLIP-44
            break;
        case "ethereum":
            slip = 60; // ETH SLIP-44
            break;
        default:
            throw new Error(`Unsupported blockchain: ${blockchain}`);
    }

    const path = `m/44'/${slip}'/0'/0/0`;

    // 3. Bitcoin
    if (slip === 0) {
        const root = bip32.fromSeed(seed);
        const child = root.derivePath(path);
        const { address } = bitcoin.payments.p2pkh({
            pubkey: child.publicKey,
            network: bitcoin.networks.bitcoin
        });

        return {
            mnemonic,
            publicKey: child.publicKey.toString("hex"),
            privateKey: child.privateKey.toString("hex"),
            address
        };
    }

    // 4. Ethereum
    if (slip === 60) {
        const root = hdkey.fromMasterSeed(seed);
        const child = root.derive(path);

        const pubKeyUncompressed = ecc.pointCompress(child.publicKey, false).slice(1);
        const addressBytes = keccak256(pubKeyUncompressed).slice(-20);
        const address = bytesToHex(addressBytes);

        return {
            mnemonic,
            publicKey: child.publicKey.toString("hex"),
            privateKey: child.privateKey.toString("hex"),
            address: `0x${address}`
        };
    }
}
