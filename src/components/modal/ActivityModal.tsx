import { Dialog, Transition } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { Output } from "@prisma/client";
import classNames from "classnames";
import { Fragment, useMemo } from "react";
import { shortenAddress } from "~/utils/address";
import { api } from "~/utils/api";
import { getActivityContent } from "~/utils/nft";

export default function ActivityModal({
  closeModal,
  show,
  output,
}: {
  closeModal: () => void;
  show: boolean;
  output: Output;
}) {
  const { data: activitiesData } = api.output.getActivities.useQuery({
    outputId: output.id,
  });
  const activities = useMemo(() => {
    return activitiesData?.map((activity) => {
      return {
        ...activity,
        createdAt: activity.createdAt.toUTCString(),
        content: getActivityContent(
          output.name,
          activity.ActivityId,
          shortenAddress(activity.sellToAddress ?? ""),
        ),
      };
    });
  }, [activitiesData, output.name, output.status]);

  console.log(activities);
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
              <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Activity
                </Dialog.Title>
                <div>
                  <ul role="list" className="mt-6 space-y-6">
                    {activities?.map((activityItem, activityItemIdx) => (
                      <li
                        key={activityItem.id}
                        className="relative flex gap-x-4"
                      >
                        <div
                          className={classNames(
                            activityItemIdx === activities.length - 1
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
                              {activityItem.ActivityId === "SELL" ? (
                                <CheckCircleIcon
                                  className="h-6 w-6 text-indigo-600"
                                  aria-hidden="true"
                                />
                              ) : (
                                <div
                                  className={classNames(
                                    "h-1.5 w-1.5 rounded-full ring-1 ring-gray-300",
                                    activityItem.ActivityId === "STOCK" &&
                                      "bg-gray-100",
                                    activityItem.ActivityId === "MAINTENANCE" &&
                                      "bg-rose-100",
                                    activityItem.ActivityId === "COMPLETE" &&
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
                              dateTime={activityItem.createdAt}
                              className="flex-none py-0.5 text-xs leading-5 text-gray-500"
                            >
                              {activityItem.createdAt}
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
