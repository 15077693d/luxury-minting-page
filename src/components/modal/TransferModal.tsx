import { Dialog, Transition } from "@headlessui/react";
import { Output } from "@prisma/client";
import { Fragment } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ITransferForm } from "~/interfaces/form";
import { api } from "~/utils/api";
import Button from "../button/Button";

export default function TransferModal({
  closeModal,
  show,
  output,
}: {
  closeModal: () => void;
  show: boolean;
  output: Output;
}) {
  const { register, handleSubmit, formState } = useForm<ITransferForm>();
  const { mutateAsync } = api.output.transfer.useMutation();
  const context = api.useContext();
  const onSubmit: SubmitHandler<ITransferForm> = async (data) => {
    await mutateAsync({ outputId: output.id, ...data });
    await context.output.invalidate();
  };
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
                  Transfer ({output.name})
                </Dialog.Title>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div className="form-control w-full bg-white">
                    <label className="label">
                      <span className="label-text">Receipt Address</span>
                    </label>
                    <input
                      {...register("sellToAddress", { required: true })}
                      type="text"
                      placeholder="9rDFJz8qaw8XPfXtASaKCj2387nSCxYj1ZNvp5w6u"
                      className="input input-bordered w-full bg-white text-black"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full"
                    isWaiting={formState.isSubmitting}
                  >
                    Send
                  </Button>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
