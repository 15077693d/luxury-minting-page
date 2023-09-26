import type { Collection } from "@prisma/client";

export type CollectionInputs = Omit<
  Collection,
  "id" | "createdAt" | "updatedAt" | "address"
>;
export type IOutput = {
  name: string;
  address: string;
};
export type IData = {
  collection: {
    name: string;
    address: string;
  };
  output: IOutput[];
};
export type IMintProps = CollectionInputs & {
  collection?: string;
  start?: number;
};

export type ITransferForm = {
  sellToAddress: string;
};

export type ITransferAPIProps = { nftAddress: string; toOwner: string };
const exampleReturn = {
  response: {
    signature:
      "38SCm8qyXE5HGWk1iuRJUpXKsny7FPSDKUxk7rwKFZrzpp3yibJj6HDxr1NvKUWrGKnxqmKv8zK8BuWwfte8RkDr",
    confirmResponse: {
      context: {
        apiVersion: "1.16.11",
        slot: 246520979,
      },
      value: {
        confirmationStatus: "confirmed",
        confirmations: 2,
        err: null,
        slot: 246520977,
        status: {
          Ok: null,
        },
      },
    },
    blockhash: "8rNZf1MZnuqZqDse82m9iFxnvnx4SGrFHRLzRCGj8EGK",
    lastValidBlockHeight: 234837100,
  },
};
export type ITransferReturn = typeof exampleReturn;
