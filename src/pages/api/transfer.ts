import {
  Metaplex,
  bundlrStorage,
  keypairIdentity,
} from "@metaplex-foundation/js";
import { TokenStandard } from "@metaplex-foundation/mpl-token-metadata";
import { base58 } from "@metaplex-foundation/umi/serializers";
import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import type { NextApiRequest, NextApiResponse } from "next";
const secretKey = base58.serialize(process.env.SECRET_KEY ?? "");
const QUICKNODE_RPC = "https://api.devnet.solana.com";
const SOLANA_CONNECTION = new Connection(QUICKNODE_RPC);
const walletPayer = Keypair.fromSecretKey(secretKey);
const METAPLEX = Metaplex.make(SOLANA_CONNECTION)
  .use(keypairIdentity(walletPayer))
  .use(
    bundlrStorage({
      address: "https://devnet.bundlr.network",
      providerUrl: QUICKNODE_RPC,
      timeout: 60000,
    }),
  );

interface ExtendedNextApiRequest extends NextApiRequest {
  body: { nftAddress: string; toOwner: string };
}

export default async function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const { nftAddress, toOwner } = req.body;
    const data = await METAPLEX.nfts().transfer({
      nftOrSft: {
        tokenStandard: TokenStandard.NonFungible,
        address: new PublicKey(nftAddress),
      },
      toOwner: new PublicKey(toOwner),
    });
    res.status(200).json(data);
  } else {
    // Handle other HTTP methods if needed
    res.status(404).end();
  }
}
