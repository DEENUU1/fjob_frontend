import Link from "next/link";
import Image from "next/image";
import React from "react";
import Container from "./home/Container";

export default function Footer() {
    const navigation = [
        "Offer",
        "Products",
        "Contact",
    ];
    const legal = ["Terms", "Privacy", "Legal"];
    return (
        <div className="relative">
            <Container>
                <div className="grid max-w-screen-xl grid-cols-1 gap-10 pt-10 mx-auto mt-5 border-t border-gray-100 dark:border-trueGray-700 lg:grid-cols-5">
                    <div className="lg:col-span-2">
                        <div>
                            {" "}
                            <Link href="/" className="flex items-center space-x-2 text-2xl font-medium text-black">
                                <Image
                                    src="/img/logo.png"
                                    alt="N"
                                    width="100"
                                    height="100"
                                />
                            </Link>
                        </div>

                        <div className="max-w-md mt-4 text-black">
                            Fjob will help you find your dream job, we will provide you with new job offers every day and match them to your expectations
                        </div>

                    </div>

                    <div>
                        <div className="flex flex-wrap w-full -mt-2 -ml-3 lg:ml-0">
                            {navigation.map((item, index) => (
                                <Link key={index} href="/" className="w-full px-4 py-2 text-black rounded-md hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 focus:outline-none dark:focus:bg-trueGray-700">
                                    {item}
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div>
                        <div className="flex flex-wrap w-full -mt-2 -ml-3 lg:ml-0">
                            {legal.map((item, index) => (
                                <Link key={index} href="/" className="w-full px-4 py-2 text-black rounded-md hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 focus:outline-none dark:focus:bg-trueGray-700">
                                    {item}
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div className="">
                        <div>Follow us</div>
                        <div className="flex mt-5 space-x-5text-black">
                            <Link
                                href="https://linkedin.com/in/kacper-wlodarczyk"
                                target="_blank"
                                rel="noopener">
                                <span className="sr-only">Linkedin</span>
                                <Linkedin />
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="my-10 text-sm text-center text-black">
                    Copyright © {new Date().getFullYear()}. Made by{" "}
                    <a
                        href="https://github.com/DEENUU1"
                        target="_blank"
                        rel="noopener">
                        Kacper Włodarczyk.
                    </a>{" "}
                </div>
            </Container>
        </div>
    );
}


const Linkedin = ({ size = 24 }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor">
        <path d="M22.23 0H1.77C.8 0 0 .77 0 1.72v20.56C0 23.23.8 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.2 0 22.23 0zM7.27 20.1H3.65V9.24h3.62V20.1zM5.47 7.76h-.03c-1.22 0-2-.83-2-1.87 0-1.06.8-1.87 2.05-1.87 1.24 0 2 .8 2.02 1.87 0 1.04-.78 1.87-2.05 1.87zM20.34 20.1h-3.63v-5.8c0-1.45-.52-2.45-1.83-2.45-1 0-1.6.67-1.87 1.32-.1.23-.11.55-.11.88v6.05H9.28s.05-9.82 0-10.84h3.63v1.54a3.6 3.6 0 0 1 3.26-1.8c2.39 0 4.18 1.56 4.18 4.89v6.21z" />
    </svg>
);
