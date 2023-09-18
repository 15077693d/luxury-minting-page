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
