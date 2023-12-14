'use client'

import {useState} from "react";
import {toast} from "react-toastify";
import getApiUrl from "@/components/api";

export default function ContactForm() {
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('email', email);
        formData.append('subject', subject);
        formData.append('message', message);

        try {
            const response = await fetch(`${getApiUrl()}api/support/contact/`, {
                method: 'POST',
                headers: {
                    'accept': 'application/json'
                },
                body: formData
            });

            if (response.ok) {
                toast.success('Form submitted successfully');
            } else {
                toast.error('Form submission failed');
            }
        } catch (error) {
            toast.error('Form submission failed');
        }
    }

    return (
        <div>
        <form className="w-full max-w-lg" onSubmit={handleSubmit}>

            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
                        E-mail
                    </label>
                    <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
                        Subject
                    </label>
                    <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="subject"
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                    />
                </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
                        Message
                    </label>
                    <textarea
                        className=" no-resize appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-48 resize-none"
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}>

                    </textarea>
                </div>
            </div>
            <div className="md:flex md:items-center">
                <div className="md:w-1/3">
                    <button className="shadow bg-teal-400 hover:bg-teal-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                            type="submit">
                        Send
                    </button>
                </div>
                <div className="md:w-2/3"></div>
            </div>
        </form>
        </div>
    )
}