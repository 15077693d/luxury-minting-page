import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

export default function TransferModal({
  closeModal,
  show,
}: {
  closeModal: () => void;
  show: boolean;
}) {
  const activity = [
    {
      id: 1,
      type: "created",
      person: { name: "Chelsea Hagon" },
      date: "7d ago",
      dateTime: "2023-01-23T10:32",
    },
    {
      id: 2,
      type: "edited",
      person: { name: "Chelsea Hagon" },
      date: "6d ago",
      dateTime: "2023-01-23T11:03",
    },
    {
      id: 3,
      type: "sent",
      person: { name: "Chelsea Hagon" },
      date: "6d ago",
      dateTime: "2023-01-23T11:24",
    },
    {
      id: 4,
      type: "commented",
      person: {
        name: "Chelsea Hagon",
        imageUrl:
          "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
      comment:
        "Called client, they reassured me the invoice would be paid by the 25th.",
      date: "3d ago",
      dateTime: "2023-01-23T15:56",
    },
    {
      id: 5,
      type: "viewed",
      person: { name: "Alex Curren" },
      date: "2d ago",
      dateTime: "2023-01-24T09:12",
    },
    {
      id: 6,
      type: "paid",
      person: { name: "Alex Curren" },
      date: "1d ago",
      dateTime: "2023-01-24T09:20",
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
                  Transfer
                </Dialog.Title>
                <form className="space-y-5">
                  <div className="form-control w-full bg-white">
                    <label className="label">
                      <span className="label-text">Receipt Address</span>
                    </label>
                    <input
                      type="text"
                      placeholder="9rDFJz8qaw8XPfXtASaKCj2387nSCxYj1ZNvp5w6u"
                      className="input input-bordered w-full bg-white"
                    />
                  </div>
                  <button className="btn btn-primary w-full">Send</button>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
