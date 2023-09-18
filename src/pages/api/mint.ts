// pages/api.js

import {
  Metaplex,
  bundlrStorage,
  keypairIdentity,
} from "@metaplex-foundation/js";
import { base58 } from "@metaplex-foundation/umi/serializers";
import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import type { NextApiRequest, NextApiResponse } from "next";
import type { IData, IMintProps, IOutput } from "~/interfaces/form";

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

async function uploadMetadata(
  imgUri: string,
  nftName: string,
  description: string,
  imgType = "image/png",
) {
  console.log(`Step 2 - Uploading Metadata`);
  const { uri } = await METAPLEX.nfts().uploadMetadata({
    name: nftName,
    description: description,
    image: imgUri,
    test: "test123",
    properties: {
      files: [
        {
          type: imgType,
          uri: imgUri,
        },
      ],
    },
  });
  console.log("Metadata URI:", uri);
  return uri;
}
async function mintNft(
  metadataUri: string,
  name: string,
  sellerFee: number,
  symbol: string,
  creators: { address: PublicKey; share: number }[],
  collection?: PublicKey,
) {
  console.log(`Step 3 - Minting NFT`);
  const { nft } = await METAPLEX.nfts().create(
    {
      uri: metadataUri,
      name: name,
      sellerFeeBasisPoints: sellerFee,
      symbol: symbol,
      creators: creators,
      isMutable: false,
      isCollection: !!collection,
      collection: collection ?? null,
    },
    { commitment: "finalized" },
  );
  console.log(
    `   Minted NFT: https://explorer.solana.com/address/${nft.address.toString()}?cluster=devnet`,
  );
  return nft.address.toString();
}
interface ExtendedNextApiRequest extends NextApiRequest {
  body: IMintProps;
}

export default async function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    // Get the collection inputs from the request body
    const { name, description, symbol, numberOfOutput, collection, start } =
      req.body;
    let collectionAddress = collection ?? "";

    const data: IData = {
      collection: {
        name,
        address: collectionAddress,
      },
      output: [],
    };
    if (!collectionAddress) {
      // Create Collection
      //const imgUri = await uploadImage(CONFIG.uploadPath, CONFIG.imgFileName);
      const metadataUri = await uploadMetadata(
        "https://i.ibb.co/qpL7z3C/certilink.png",
        name,
        description,
      );
      collectionAddress = await mintNft(
        metadataUri,
        name,
        0,
        symbol,
        [],
        // depends on collectio NFT or NFT
        //CONFIG.collection,
      );
      data.collection.address = collectionAddress;
    }

    // Create Items
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const promises = [...Array(Number(numberOfOutput))].map(
      (_, i) =>
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        new Promise<IOutput>(async (resolve, reject) => {
          try {
            const outputName = `${name} #${i + Number(start ?? 0)}`;
            const metadataUri = await uploadMetadata(
              "https://i.ibb.co/qpL7z3C/certilink.png",
              name,
              description,
            );
            const address = await mintNft(
              metadataUri,
              outputName,
              0,
              symbol,
              [],
              // depends on collectio NFT or NFT
              new PublicKey(collectionAddress),
            );
            resolve({
              name: outputName,
              address,
            });
          } catch (error) {
            reject(error);
          }
        }),
    );
    data.output = await Promise.all(promises);
    res.status(200).json(data);
  } else {
    // Handle other HTTP methods if needed
    res.status(404).end();
  }
}
