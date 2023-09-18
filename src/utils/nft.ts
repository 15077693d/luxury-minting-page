import type { IData, IMintProps } from "~/interfaces/form";
import { callApi } from "./api";

export const mintNFT = async (body: IMintProps) => {
  return await callApi<IData, IMintProps>("mint", body, "POST");
};
