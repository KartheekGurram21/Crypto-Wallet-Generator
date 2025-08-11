import * as bip39 from "bip39";
import BIP32Factory from "bip32";
import * as bitcoin from "bitcoinjs-lib";
import * as ecc from "tiny-secp256k1";
import bs58 from "bs58";
import { blockchains } from "./blockchainInfo";

const bip32 = BIP32Factory(ecc);

export function generateKeyPairs(mnemonics, id, blockchainName) {
    try {
        const blockchain = blockchains.find(b => b.name === blockchainName);
        if (!blockchain) throw new Error("Blockchain is not supported");

        const slip = blockchain.derivationPathCode;
        const seed = bip39.mnemonicToSeedSync(mnemonics);
        const root = bip32.fromSeed(seed, bitcoin.networks.bitcoin);

        if (slip === 0) { // Bitcoin
            const path = `m/44'/${slip}'/${id}'/0/0`;
            const child = root.derivePath(path);

            return {
                publicKey: bs58.encode(child.publicKey),
                privateKey: bs58.encode(child.privateKey),
                wif: child.toWIF()
            };
        }

        throw new Error(`SLIP ${slip} not yet supported`);
    } catch (err) {
        console.error(err);
        return { error: err.message };
    }
}
