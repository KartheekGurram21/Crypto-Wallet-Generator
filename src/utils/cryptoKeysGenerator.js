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

        if (slip === 0) { // Bitcoin
            const root = bip32.fromSeed(seed, bitcoin.networks.bitcoin);
            const path = `m/84'/${slip}'/${id}'/0/0`; // 84' for bech32 (P2WPKH)
            const child = root.derivePath(path);

            const { address } = bitcoin.payments.p2wpkh({
                pubkey: Buffer.from(child.publicKey),
                network: bitcoin.networks.bitcoin,
            });

            return {
                address, // bc1... Bech32 format
                publicKey: address,// Base58 encoding of raw pubkey
                privateKey: bs58.encode(child.privateKey), // Base58 encoding of raw privkey
                wif: child.toWIF(), // standard Bitcoin WIF
            };
        }

        throw new Error(`SLIP ${slip} not yet supported`);
    } catch (err) {
        console.error(err);
        return { error: err.message };
    }
}
