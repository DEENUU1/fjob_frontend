'use client'

import {useState} from "react";
import {toast} from "react-toastify";
import ContactInfo from "@/components/contact/ContactInfo";
import {Button} from "@nextui-org/react";

export default function ContactForm() {
    const [email, setEmail] = useState<string>("");
    const [subject, setSubject] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        setIsLoading(true);

        const formData = new FormData();
        formData.append("email", email);
        formData.append("subject", subject);
        formData.append("message", message);

        try {
            const response = await fetch(process.env.API_URL + "api/support/contact/", {
                method: "POST",
                headers: {
                    accept: "application/json",
                },
                body: formData,
            });

            if (response.ok) {
                toast.success("Form submitted successfully");
            } else {
                toast.error("Form submission failed");
            }
        } catch (error) {
            toast.error("Form submission failed");
        } finally {
            setIsLoading(false)
        }
    };

    return (
        <div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16 grid md:grid-cols-2 lg:grid-cols-2 gap-y-8 md:gap-x-8 md:gap-y-8 lg:gap-x-8 lg:gap-y-16">
                {/* ContactInfo component with short text, email, phone number etc */}
                <ContactInfo/>
                <div>
                    <form onSubmit={handleSubmit}>
                        <input type="checkbox" id="" className="hidden" name="botcheck"/>
                        <div className="mb-5">
                            <input type="text" placeholder="Subject" autoComplete="false" required
                                   className="w-full px-4 py-3 rounded-md outline-none focus:ring-4 border-2 border-gray-200 hover:shadow-md ring-neutral-100"
                                   name="name"
                                   value={subject}
                                   onChange={(e) => setSubject(e.target.value)}
                            />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="email_address" className="sr-only">Email Address</label>
                            <input id="email_address" type="email" placeholder="Email Address" autoComplete="false"
                                   required
                                   className="w-full px-4 py-3 rounded-md outline-none focus:ring-4 border-2 border-gray-200 hover:shadow-md ring-neutral-100"
                                   name="email"
                                   value={email}
                                   onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                        <textarea placeholder="Your Message"
                                  required
                                  className="w-full px-4 py-3 rounded-md outline-none focus:ring-4 border-2 border-gray-200 hover:shadow-md ring-neutral-100"
                                  name="message"
                                  value={message}
                                  onChange={(e) => setMessage(e.target.value)}
                        >
                        </textarea>
                        </div>
                        <Button type="submit" color="primary" isLoading={isLoading}>
                            {isLoading ? 'Loading' : 'Send'}
                        </Button>

                    </form>
                </div>
            </div>
        </div>

    )
}