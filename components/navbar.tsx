'use client';

import Link from "next/link";
import Image from "next/image"
import { Disclosure } from "@headlessui/react";

import { usePathname } from 'next/navigation';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import {useLogoutMutation, useRetrieveUserQuery} from '@/redux/features/authApiSlice';
import { logout as setLogout } from '@/redux/features/authSlice';


const Navbar = () => {
    const pathname = usePathname();
    const dispatch = useAppDispatch();
    const {data: user} = useRetrieveUserQuery()
    const [logout] = useLogoutMutation();

    const { isAuthenticated } = useAppSelector(state => state.auth);

    const handleLogout = () => {
        logout(undefined)
            .unwrap()
            .then(() => {
                dispatch(setLogout());
            });
    };


    // @ts-ignore
    return (
        <div className="w-full">
            <nav className="container relative flex flex-wrap items-center justify-between p-8 mx-auto lg:justify-between xl:px-0">
                {/* Logo  */}
                <Disclosure>
                    {({ open }) => (
                        <>
                            <div className="flex flex-wrap items-center justify-between w-full lg:w-auto">
                                <Link href="/">
                  <span className="flex items-center space-x-2 text-2xl font-medium text-black">
                    <span>
                      <Image
                          src="/img/logo.svg"
                          alt="N"
                          width="32"
                          height="32"
                          className="w-8"
                      />
                    </span>
                    <span>FJob</span>
                  </span>
                                </Link>

                                <Disclosure.Button
                                    aria-label="Toggle Menu"
                                    className="px-2 py-1 ml-auto text-blackrounded-md lg:hidden hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 focus:outline-none dark:text-gray-300 dark:focus:bg-trueGray-700">
                                    <svg
                                        className="w-6 h-6 fill-current"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24">
                                        {open && (
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                                            />
                                        )}
                                        {!open && (
                                            <path
                                                fillRule="evenodd"
                                                d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                                            />
                                        )}
                                    </svg>
                                </Disclosure.Button>
                                <Disclosure.Panel className="flex flex-wrap w-full my-5 lg:hidden">
                                    <>
                                        <Link href="/" className="w-full px-6 py-2 mt-3 text-center lg:ml-5">
                                            Home
                                        </Link>
                                        <Link href="/offer" className="w-full px-6 py-2 mt-3 text-center lg:ml-5">
                                            Offers
                                        </Link>
                                        <Link href="/companies" className="w-full px-6 py-2 mt-3 text-center lg:ml-5">
                                            Companies
                                        </Link>
                                        <Link href="/contact" className="w-full px-6 py-2 mt-3 text-center lg:ml-5">
                                            Contact
                                        </Link>

                                        {isAuthenticated ? (
                                                <>
                                                    {/*  If user.account_type == "USER" display Dashboard and if its "COMPANY" display company dashboard  */}
                                                    {user?.account_type == "USER" ? (
                                                        <Link href="/dashboard" className="w-full px-6 py-2 mt-3 text-center lg:ml-5">
                                                            Dashboard
                                                        </Link>
                                                    ) : (
                                                        <Link href="/company" className="w-full px-6 py-2 mt-3 text-center lg:ml-5">
                                                            Dashboard
                                                        </Link>
                                                    )}
                                                    <button onClick={handleLogout} className="w-full px-6 py-2 mt-3 text-center- lg:ml-5">
                                                        Logout
                                                    </button>


                                                </>
                                            )
                                            : (
                                                <>
                                                    <Link href="/auth/login" className="w-full px-6 py-2 mt-3 text-center lg:ml-5 bg-blue-400 hover:bg-blue-500 rounded-md ">
                                                        Get Started
                                                    </Link>
                                                    <Link href="/auth/register/company" className="w-full px-6 py-2 mt-3 text-center bg-purple-400 hover:bg-purple-500 rounded-md lg:ml-5">
                                                        Post offer
                                                    </Link>
                                                </>
                                            )
                                        }

                                    </>
                                </Disclosure.Panel>

                            </div>
                        </>
                    )}
                </Disclosure>

                {/* menu  */}
                <div className="hidden text-center lg:flex lg:items-center">
                    <ul className="items-center justify-end flex-1 pt-6 list-none lg:pt-0 lg:flex">
                        <li className="mr-3 nav__item">
                            <Link href="/" className="inline-block px-4 py-2 text-lg font-normal text-black no-underline rounded-md  hover:text-gray-700">
                                Home
                            </Link>
                            <Link href="/offer" className="inline-block px-4 py-2 text-lg font-normal text-black no-underline rounded-md  hover:text-gray-700">
                                Offers
                            </Link>
                            <Link href="/companies" className="inline-block px-4 py-2 text-lg font-normal text-black no-underline rounded-md  hover:text-gray-700">
                                Companies
                            </Link>
                            <Link href="/contact" className="inline-block px-4 py-2 text-lg font-normal text-black no-underline rounded-md  hover:text-gray-700">
                                Contact
                            </Link>
                        </li>
                    </ul>
                </div>

                <div className="hidden mr-3 space-x-4 lg:flex nav__item">
                    {isAuthenticated ? (
                        <>
                        {/*  If user.account_type == "USER" display Dashboard and if its "COMPANY" display company dashboard  */}
                        {user?.account_type == "USER" ? (
                            <Link href="/dashboard" className="px-6 py-2 text-black">
                                Dashboard
                            </Link>
                        ) : (
                            <Link href="/company" className="px-6 py-2 text-black">
                                Dashboard
                            </Link>
                        )}
                        <button onClick={handleLogout}>
                            Logout
                        </button>


                        </>
                        )
                        : (
                            <>
                        <Link href="/auth/login" className="px-6 py-2 text-black bg-blue-400 hover:bg-blue-500 rounded-md md:ml-5">
                        Get Started
                        </Link>
                        <Link href="/auth/register/company" className="px-6 py-2 text-black bg-purple-400 hover:bg-purple-500 rounded-md md:ml-5">
                        Post offer
                        </Link>
                        </>
                        )
                    }
                </div>

            </nav>
        </div>
    );
}

export default Navbar;