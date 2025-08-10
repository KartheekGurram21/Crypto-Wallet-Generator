import { mnemonicToSeedSync } from "bip39";
import nacl from "tweetnacl";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import { blockchains } from "./blockchainInfo";

export function generateKeyPairs(mnemonic, id, blockchainName) {
    const seed = mnemonicToSeedSync(mnemonic);
    const x = 5;
    const path = `m/44'/${x}'/${id}'/0`;
    const derivedSeed = derivePath(path, seed.toString("hex")).key;
    const privateKey = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey.toBase58();
    const publicKey = Keypair.fromSecretKey(privateKey).publicKey.toBase58();
    return {
        "privateKey": privateKey,
        "publicKey": publicKey
    };
}