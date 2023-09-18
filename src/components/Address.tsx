import { shortenAddress } from "~/utils/address";

export default function Address({ address }: { address: string }) {
  return <div>{shortenAddress(address)}</div>;
}
