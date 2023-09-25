import { ArrowUpRightIcon } from "@heroicons/react/20/solid";
import { DocumentDuplicateIcon } from "@heroicons/react/24/outline";
import { type Status } from "@prisma/client";
import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import { api } from "~/utils/api";
import Address from "./Address";
import Button from "./button/Button";
import ActivityModal from "./modal/ActivityModal";
import TransferModal from "./modal/TransferModal";

export default function Collection() {
  const { mutateAsync: maintain } = api.output.maintain.useMutation();
  const { mutateAsync: complete } = api.output.complete.useMutation();
  const context = api.useContext();

  const data = useRouter();
  const [selectedOutputId, setSelectedOutputId] = useState<string | null>(null);
  const [modalId, setModalId] = useState<
    Status | "ACTIVITY" | "COMPLETE" | null
  >(null);
  const closeModal = () => {
    setModalId(null);
  };
  const { data: outputItems } = api.output.getAll.useQuery({
    collectionId: data.query.id as string,
  });
  const selectedOutput = useMemo(() => {
    return outputItems?.find((item) => item.id === selectedOutputId);
  }, [outputItems, selectedOutputId]);
  const statuses: {
    [id in Status]: {
      className: string;
      buttonName: string;
      callBack: (outputId: string) => void;
    };
  } = {
    STOCK: {
      className: "text-gray-400 bg-gray-400/10",
      buttonName: "transfer",
      callBack: (outputId: string) => {
        setModalId("SELL");
        setSelectedOutputId(outputId);
      },
    },
    SELL: {
      className: "text-green-400 bg-green-400/10",
      buttonName: "MAINTENANCE",
      callBack: (outputId: string) => {
        void maintain({
          outputId,
        })
          .then((result) => {
            void context.output.invalidate();
          })
          .catch((error) => console.log(error));
        setSelectedOutputId(outputId);
      },
    },
    MAINTENANCE: {
      className: "text-rose-400 bg-rose-400/10",
      buttonName: "Complete",
      callBack: (outputId: string) => {
        void complete({
          owner: selectedOutput?.owner ?? null,
          outputId,
        })
          .then((result) => {
            void context.output.invalidate();
          })
          .catch((error) => console.log(error));
        setSelectedOutputId(outputId);
      },
    },
  };
  const stats = [
    { name: "Number of Output", value: outputItems?.length, unit: "" },
  ];

  return (
    <div>
      <header>
        {/* Secondary navigation */}
        {/* Heading */}
        <div className="flex flex-col items-start justify-between gap-x-8 gap-y-4 bg-gray-700/10 px-4 py-4 sm:flex-row sm:items-center sm:px-6 lg:px-8">
          <div>
            <div className="flex items-center gap-x-3">
              <div className="flex-none rounded-full bg-green-400/10 p-1 text-green-400">
                <div className="h-2 w-2 rounded-full bg-current" />
              </div>
              <h1 className="flex gap-x-3 text-base leading-7">
                <span className="font-semibold text-white">Collection</span>
                <span className="text-gray-600">/</span>
                <span className="font-semibold text-white">
                  {data.query.address}
                </span>
              </h1>
            </div>
            <p className="mt-2 text-xs leading-6 text-gray-400">
              An overview of the collection output and the data dashboard
              provides a comprehensive summary.
            </p>
          </div>
          <div className="order-first flex-none rounded-full bg-indigo-400/10 px-2 py-1 text-xs font-medium text-indigo-400 ring-1 ring-inset ring-indigo-400/30 sm:order-none">
            Devnet
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 bg-gray-700/10 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, statIdx) => (
            <div
              key={stat.name}
              className={classNames(
                statIdx % 2 === 1
                  ? "sm:border-l"
                  : statIdx === 2
                  ? "lg:border-l"
                  : "",
                "border-t border-white/5 px-4 py-6 sm:px-6 lg:px-8",
              )}
            >
              <p className="text-sm font-medium leading-6 text-gray-400">
                {stat.name}
              </p>
              <p className="mt-2 flex items-baseline gap-x-2">
                <span className="text-4xl font-semibold tracking-tight text-white">
                  {stat.value}
                </span>
                {stat.unit ? (
                  <span className="text-sm text-gray-400">{stat.unit}</span>
                ) : null}
              </p>
            </div>
          ))}
        </div>
      </header>
      {/* Activity list */}
      <div className="border-t border-white/10 pt-11">
        <h2 className="px-4 text-base font-semibold leading-7 text-white sm:px-6 lg:px-8">
          All Output
        </h2>
        <table className="mt-6 w-full whitespace-nowrap text-left">
          <colgroup>
            <col className="w-full sm:w-4/12" />
            <col className="lg:w-4/12" />
            <col className="lg:w-2/12" />
            <col className="lg:w-1/12" />
            <col className="lg:w-1/12" />
          </colgroup>
          <thead className="border-b border-white/10 text-sm leading-6 text-white">
            <tr>
              <th
                scope="col"
                className="py-2 pl-4 pr-8 font-semibold sm:pl-6 lg:pl-8"
              >
                Name
              </th>
              <th
                scope="col"
                className="py-2 pl-0 pr-8 font-semibold sm:table-cell"
              >
                Address
              </th>
              <th
                scope="col"
                className="py-2 pl-0 pr-8 font-semibold sm:table-cell"
              >
                Owner
              </th>
              <th
                scope="col"
                className="hidden py-2 pl-0 pr-4 text-right font-semibold sm:table-cell sm:pr-8 sm:text-left lg:pr-20"
              >
                Status
              </th>
              <th
                scope="col"
                className="hidden py-2 pl-0 pr-4 text-right font-semibold sm:table-cell sm:pr-8 sm:text-left lg:pr-20"
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {outputItems?.map((item) => (
              <tr key={item.address}>
                <td className="py-4 pl-4 pr-8 sm:pl-6 lg:pl-8">
                  <button
                    onClick={() => {
                      setSelectedOutputId(item.id);
                      setModalId("ACTIVITY");
                    }}
                    className="btn flex items-center gap-x-4"
                  >
                    <div className="truncate text-sm font-medium leading-6 text-white">
                      {item.name}
                    </div>
                  </button>
                </td>
                <td className=" py-4 pl-0 pr-4 sm:table-cell sm:pr-8">
                  <div className="flex gap-x-3">
                    <button className="font-mono text-sm leading-6 text-gray-400 flex items-center">
                      <Address address={item.address} />
                      <DocumentDuplicateIcon className="ml-1" width={14} />
                    </button>
                    <Link
                      target="_blank"
                      href={`https://solscan.io/token/${item.address}?cluster=devnet`}
                    >
                      <button className="inline-flex items-center rounded-md bg-gray-400/10 px-2 py-1 text-xs font-medium text-gray-400 ring-1 ring-inset ring-gray-400/20">
                        solcan <ArrowUpRightIcon className="ml-2" width={14} />
                      </button>
                    </Link>
                  </div>
                </td>
                <td className=" py-4 pl-0 pr-4 sm:table-cell sm:pr-8">
                  <div className="flex gap-x-3">
                    {item.owner ? (
                      <button className="font-mono text-sm leading-6 text-gray-400 flex items-center">
                        <Address address={item.owner} />
                        <DocumentDuplicateIcon className="ml-1" width={14} />
                      </button>
                    ) : (
                      "-"
                    )}
                  </div>
                </td>

                <td className="py-4 pl-0 pr-4 text-sm leading-6 sm:pr-8 lg:pr-20">
                  <div className="hidden sm:flex items-center justify-end gap-x-2 sm:justify-start">
                    <div
                      className={classNames(
                        statuses[item.status].className,
                        "flex-none rounded-full p-1",
                      )}
                    >
                      <div className="h-1.5 w-1.5 rounded-full bg-current" />
                    </div>
                    <div className="hidden text-white sm:block ">
                      {item.status}
                    </div>
                  </div>
                </td>
                <td className="hidden py-4 pl-0 pr-4 text-sm leading-6 sm:flex sm:pr-8 lg:pr-20">
                  <Button
                    onClick={() => statuses[item.status].callBack(item.id)}
                  >
                    {statuses[item.status].buttonName}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedOutput && (
        <ActivityModal
          show={modalId === "ACTIVITY"}
          closeModal={closeModal}
          output={selectedOutput}
        />
      )}
      {selectedOutput && (
        <TransferModal
          show={modalId === "SELL"}
          closeModal={closeModal}
          output={selectedOutput}
        />
      )}
    </div>
  );
}
