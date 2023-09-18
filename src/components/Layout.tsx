import { Dialog, Transition } from "@headlessui/react";
import { Bars3Icon, MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import {
  ArchiveBoxArrowDownIcon,
  PlusCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import classNames from "classnames";
import Head from "next/head";
import { useRouter } from "next/router";
import { Fragment, ReactElement, useState } from "react";

const navigation = [
  { name: "Create", href: "/", icon: PlusCircleIcon },
  { name: "Collection", href: "/collections", icon: ArchiveBoxArrowDownIcon },
];

export default function Layout({ children }: { children?: ReactElement }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  return (
    <>
      <Head>
        <title>CertiLink Admin</title>
        <meta
          name="description"
          content="Craft Your Digital Masterpieces and Showcase them in the World of Luxury Non-Fungible Tokens"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-[100vh]">
        <>
          <div>
            <Transition.Root show={sidebarOpen} as={Fragment}>
              <Dialog
                as="div"
                className="relative z-50 xl:hidden"
                onClose={setSidebarOpen}
              >
                <Transition.Child
                  as={Fragment}
                  enter="transition-opacity ease-linear duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="transition-opacity ease-linear duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="fixed inset-0 bg-gray-900/80" />
                </Transition.Child>

                <div className="fixed inset-0 flex">
                  <Transition.Child
                    as={Fragment}
                    enter="transition ease-in-out duration-300 transform"
                    enterFrom="-translate-x-full"
                    enterTo="translate-x-0"
                    leave="transition ease-in-out duration-300 transform"
                    leaveFrom="translate-x-0"
                    leaveTo="-translate-x-full"
                  >
                    <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                      <Transition.Child
                        as={Fragment}
                        enter="ease-in-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in-out duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                          <button
                            type="button"
                            className="-m-2.5 p-2.5"
                            onClick={() => setSidebarOpen(false)}
                          >
                            <span className="sr-only">Close sidebar</span>
                            <XMarkIcon
                              className="h-6 w-6 text-white"
                              aria-hidden="true"
                            />
                          </button>
                        </div>
                      </Transition.Child>
                      {/* Sidebar component, swap this element with another sidebar if you like */}
                      <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 ring-1 ring-white/10">
                        <div className="flex h-16 shrink-0 items-center">
                          <img
                            className="mt-3 h-14 w-auto"
                            src="/certilink.png"
                            alt="Your Company"
                          />
                        </div>
                        <nav className="flex flex-1 flex-col">
                          <ul
                            role="list"
                            className="flex flex-1 flex-col gap-y-7"
                          >
                            <li>
                              <ul role="list" className="-mx-2 space-y-1">
                                {navigation.map((item) => (
                                  <li key={item.name}>
                                    <a
                                      href={item.href}
                                      className={classNames(
                                        item.href === router.route ||
                                          (item.href === "/collections" &&
                                            router.route.includes("collection"))
                                          ? "bg-gray-800 text-white"
                                          : "text-gray-400 hover:bg-gray-800 hover:text-white",
                                        "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6",
                                      )}
                                    >
                                      <item.icon
                                        className="h-6 w-6 shrink-0"
                                        aria-hidden="true"
                                      />
                                      {item.name}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </li>
                          </ul>
                        </nav>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </Dialog>
            </Transition.Root>

            {/* Static sidebar for desktop */}
            <div className="hidden xl:fixed xl:inset-y-0 xl:z-50 xl:flex xl:w-72 xl:flex-col">
              {/* Sidebar component, swap this element with another sidebar if you like */}
              <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-black/10 px-6 ring-1 ring-white/5">
                <div className="flex h-16 shrink-0 items-center">
                  <img
                    className="mt-3 h-14 w-auto"
                    src="/certilink.png"
                    alt="Your Company"
                  />
                </div>
                <nav className="flex flex-1 flex-col">
                  <ul role="list" className="flex flex-1 flex-col gap-y-7">
                    <li>
                      <ul role="list" className="-mx-2 space-y-1">
                        {navigation.map((item) => (
                          <li key={item.name}>
                            <a
                              href={item.href}
                              className={classNames(
                                item.href === router.route ||
                                  (item.href === "/collections" &&
                                    router.route.includes("collection"))
                                  ? "bg-gray-800 text-white"
                                  : "text-gray-400 hover:bg-gray-800 hover:text-white",
                                "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6",
                              )}
                            >
                              <item.icon
                                className="h-6 w-6 shrink-0"
                                aria-hidden="true"
                              />
                              {item.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>

            <div className="xl:pl-72">
              {/* Sticky search header */}
              <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-6 border-b border-white/5 bg-gray-900 px-4 shadow-sm sm:px-6 lg:px-8">
                <button
                  type="button"
                  className="-m-2.5 p-2.5 text-white xl:hidden"
                  onClick={() => setSidebarOpen(true)}
                >
                  <span className="sr-only">Open sidebar</span>
                  <Bars3Icon className="h-5 w-5" aria-hidden="true" />
                </button>

                <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
                  <form className="flex flex-1" action="#" method="GET">
                    <label htmlFor="search-field" className="sr-only">
                      Search
                    </label>
                    <div className="relative w-full">
                      <MagnifyingGlassIcon
                        className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-500"
                        aria-hidden="true"
                      />
                      <input
                        id="search-field"
                        className="block h-full w-full border-0 bg-transparent py-0 pl-8 pr-0 text-white focus:ring-0 sm:text-sm"
                        placeholder="Search..."
                        type="search"
                        name="search"
                      />
                    </div>
                  </form>
                </div>
              </div>

              <main>{children}</main>
            </div>
          </div>
        </>
      </main>
    </>
  );
}
