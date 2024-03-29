'use client';

import React from "react";
import Container from "./Container";
import {Disclosure} from "@headlessui/react";
import {ChevronUpIcon} from "@heroicons/react/24/solid";

const Faq = () => {
  return (
    <Container className="!p-0">
      <div className="w-full max-w-2xl p-2 mx-auto rounded-2xl">
        {faqdata.map((item, index) => (
          <div key={item.question} className="mb-5">
            <Disclosure>
              {({open}) => (
                <>
                  <Disclosure.Button
                    className="flex items-center justify-between w-full px-4 py-4 text-lg text-left text-black rounded-lg bg-gray-50 hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-indigo-100 focus-visible:ring-opacity-75 dark:bg-trueGray-800 dark:text-gray-200">
                    <span className="text-black">{item.question}</span>
                    <ChevronUpIcon
                      className={`${
                        open ? "transform rotate-180" : ""
                      } w-5 h-5 text-black`}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel className="px-4 pt-4 pb-2 text-black ">
                    {item.answer}
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          </div>
        ))}
      </div>
    </Container>
  );
}

const faqdata = [
  {
    question: "Is it free?",
    answer: "Yes, if you are looking for a job FJob is totally free for you. For companies, we offer setting up the first company for free as well as one free advertisement.",
  },
];

export default Faq;