'use client';


import {useState} from "react";
import {toast} from 'react-toastify';
import {useRetrieveUserQuery} from "@/redux/features/authApiSlice";
import {useAppSelector} from "@/redux/hooks";
import Confetti from "@/components/Confetti";


export default function ApplyForm({offerId}: {offerId: number}) {
    const [first_name, setFirstName] = useState<string>("");
    const [last_name, setLastName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [resume, setResume] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const [isFormSubmitted, setIsFormSubmitted] = useState<boolean>(false);

    const {data: user} = useRetrieveUserQuery()


    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("first_name", first_name);
        formData.append("last_name", last_name);
        formData.append("email", email);
        formData.append("phone", phone);
        formData.append("message", message);
        formData.append("cv", resume);
        formData.append("offer", offerId);

        if (!user.id === null) {
            formData.append("user", user.id);
        }

        try {
            const response = await fetch(process.env.API_URL + "api/candidate/candidate/", {
                method: "POST",
                headers: {
                    accept: "application/json",
                },
                body: formData,
            });

            if (response.ok) {
                toast.success("Application sent");
                setIsFormSubmitted(true);
            } else {
                toast.error("Error while sending your application, please try again");
            }
        } catch (error) {
            toast.error("Failed to sent your application");
        }
    };
    return (
        <>
            {isFormSubmitted ? (
                <>
                    <Confetti />
                </>
            ): null}

            <div>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="first_name">First name</label>
                    <input
                        type="text" id="first_name" autoComplete="true" required placeholder="First name"
                        name="first_name" value={first_name} onChange={(e) => setFirstName(e.target.value)}
                    />
                    <label htmlFor="last_name">Last name</label>
                    <input
                        type="text" id="first_name" autoComplete="true" required placeholder="Last name"
                        name="last_name" value={last_name} onChange={(e) => setLastName(e.target.value)}
                    />

                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" autoComplete="true" required placeholder="Email address"
                           name="email" value={email} onChange={(e) => setEmail(e.target.value)}
                   />
                    <label htmlFor="phone">Phone number</label>
                    <input type="text" id="phone" autoComplete="true" required placeholder="Phone number"
                           name="phone" value={phone} onChange={(e) => setPhone(e.target.value)}
                   />

                    <label htmlFor="resume">Resume</label>
                    <input type="file" id="resume" required name="phone" value={resume} onChange={(e) => setResume(e.target.value[0])}
                    />

                    <label htmlFor="message">Message to the recruiter</label>
                    <textarea id="message" placeholder="Message" name="message" value={message} onChange={(e) => setMessage(e.target.value)}/>

                    <button type="submit">
                        Apply
                    </button>
                </form>
            </div>
        </>
    )
}