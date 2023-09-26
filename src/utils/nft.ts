import { ActivityType } from "@prisma/client";
import type {
  IData,
  IMintProps,
  ITransferAPIProps,
  ITransferReturn,
} from "~/interfaces/form";
import { callApi } from "./api";

export const mintNFT = async (body: IMintProps) => {
  return await callApi<IData, IMintProps>("mint", body, "POST");
};

export const transferNFT = async (body: ITransferAPIProps) => {
  return await callApi<ITransferReturn, ITransferAPIProps>(
    "transfer",
    body,
    "POST",
  );
};
export const getActivityContent = (
  name: string,
  status: ActivityType,
  sellToAddress?: string,
) => {
  switch (status) {
    case "STOCK":
      return `${name} is created.`;
    case "SELL":
      return `${name} is sold to address ${sellToAddress}.`;
    case "MAINTENANCE":
      return `${name} is undergoing maintenance.`;

    case "COMPLETE":
      return `The maintenance for ${name} has been completed.`;

    default:
      break;
  }
  return "";
};
