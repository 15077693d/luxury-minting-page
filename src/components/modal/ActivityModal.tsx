import { Dialog, Transition } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { Status } from "@prisma/client";
import classNames from "classnames";
import { Fragment } from "react";
import { getActivityContent } from "~/utils/nft";

export default function ActivityModal({
  closeModal,
  show,
}: {
  closeModal: () => void;
  show: boolean;
}) {
  const activity: {
    id: string;
    status: Status | "COMPLETE";
    dateTime: string;
    content: string;
  }[] = [
    {
      id: "123",
      status: "STOCK",
      dateTime: "12/10/2001",
      content: getActivityContent("LV001", "STOCK"),
    },
    {
      id: "134",
      status: "SELL",
      dateTime: "12/10/2001",
      content: getActivityContent("LV001", "SELL", "0x123"),
    },
    {
      id: "134",
      status: "MAINTENANCE",
      dateTime: "12/10/2001",
      content: getActivityContent("LV001", "MAINTENANCE"),
    },
    {
      id: "134",
      status: "COMPLETE",
      dateTime: "12/10/2001",
      content: getActivityContent("LV001", "COMPLETE"),
    },
  ];
  return (
    <Transition appear show={show} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Activity
                </Dialog.Title>
                <div>
                  <ul role="list" className="mt-6 space-y-6">
                    {activity.map((activityItem, activityItemIdx) => (
                      <li
                        key={activityItem.id}
                        className="relative flex gap-x-4"
                      >
                        <div
                          className={classNames(
                            activityItemIdx === activity.length - 1
                              ? "h-6"
                              : "-bottom-6",
                            "absolute left-0 top-0 flex w-6 justify-center",
                          )}
                        >
                          <div className="w-px bg-gray-200" />
                        </div>
                        {
                          <>
                            <div className="relative flex h-6 w-6 flex-none items-center justify-center bg-white">
                              {activityItem.status === "SELL" ? (
                                <CheckCircleIcon
                                  className="h-6 w-6 text-indigo-600"
                                  aria-hidden="true"
                                />
                              ) : (
                                <div
                                  className={classNames(
                                    "h-1.5 w-1.5 rounded-full ring-1 ring-gray-300",
                                    activityItem.status === "STOCK" &&
                                      "bg-gray-100",
                                    activityItem.status === "MAINTENANCE" &&
                                      "bg-rose-100",
                                    activityItem.status === "COMPLETE" &&
                                      "bg-green-100",
                                  )}
                                />
                              )}
                            </div>
                            <p className="flex-auto py-0.5 text-xs leading-5 text-gray-500">
                              <span className="font-medium text-gray-900">
                                {activityItem.content}
                              </span>{" "}
                            </p>
                            <time
                              dateTime={activityItem.dateTime}
                              className="flex-none py-0.5 text-xs leading-5 text-gray-500"
                            >
                              {activityItem.dateTime}
                            </time>
                          </>
                        }
                      </li>
                    ))}
                  </ul>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
