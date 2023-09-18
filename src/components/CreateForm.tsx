import { Dialog, Transition } from "@headlessui/react";
import classNames from "classnames";
import Link from "next/link";
import { Fragment, useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import type { CollectionInputs } from "~/interfaces/form";
import { api } from "~/utils/api";

export default function CreateForm() {
  const { register, handleSubmit, getValues, formState } =
    useForm<CollectionInputs>();
  const [status, setStatus] = useState<null | "creating" | "finish">(null);
  const { mutateAsync } = api.collection.create.useMutation({});
  const onSubmit: SubmitHandler<CollectionInputs> = async (data) => {
    setStatus("creating");
    await mutateAsync({ ...data, numberOfOutput: Number(data.numberOfOutput) });
    setStatus("finish");
  };
  function closeModal() {
    setStatus(null);
  }
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className=" p-10">
        <div className="space-y-12">
          <div className="border-b border-white/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-white">
              Create Collection
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-400">
              Craft Your Digital Masterpieces and Showcase them in the World of
              Luxury Non-Fungible Tokens
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-9">
              <div className="sm:col-span-3">
                <label htmlFor="username">Name</label>
                <div className="mt-2">
                  <input
                    disabled={formState.isSubmitting}
                    type="text"
                    className={classNames("input input-bordered w-full")}
                    placeholder="LV collection 001"
                    {...register("name", { required: true })}
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Number of Output
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">
                    <input
                      disabled={formState.isSubmitting}
                      type="number"
                      className={classNames("input input-bordered w-full")}
                      placeholder="1000"
                      {...register("numberOfOutput", {
                        valueAsNumber: true,
                        required: true,
                      })}
                    />
                  </div>
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Symbol
                </label>
                <div className="mt-2">
                  <input
                    disabled={formState.isSubmitting}
                    className={classNames("input input-bordered w-full")}
                    placeholder="LV"
                    {...register("symbol", {
                      required: true,
                    })}
                  />
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="about"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  About
                </label>
                <div className="mt-2">
                  <textarea
                    rows={3}
                    className={classNames("textarea textarea-bordered w-full")}
                    disabled={formState.isSubmitting}
                    defaultValue={""}
                    {...register("description", { required: true })}
                  />
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-400">
                  Write a few sentences about the collection.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="submit"
            className={`btn btn-primary`}
            disabled={formState.isSubmitting}
          >
            {formState.isSubmitting && (
              <span className="loading loading-spinner"></span>
            )}{" "}
            Confirm
          </button>
        </div>
      </form>
      <p className="text-sm text-gray-500"></p>
      <Transition appear show={status === "creating"} as={Fragment}>
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
                    Collection is creating
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      The collection may take 1-2 minutes to create, please wait
                      and do not close the window.
                    </p>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={closeModal}
                    >
                      Got it, thanks!
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <Transition appear show={status === "finish"} as={Fragment}>
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
                    Collection Create Successfully 🎉
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      The collection ({getValues().name}) has been successfully
                      created with {getValues().numberOfOutput} outputs.
                    </p>
                  </div>

                  <div className="mt-4 space-x-3">
                    <Link
                      href="/collections"
                      type="button"
                      className="btn btn-primary"
                    >
                      Go to Collection Page
                    </Link>
                    <button onClick={closeModal} type="button" className="btn">
                      Close
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
