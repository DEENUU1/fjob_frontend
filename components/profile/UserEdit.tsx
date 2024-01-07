'use client'

import React, {useState} from "react";
import {toast} from "react-toastify";
import {useRetrieveUserQuery} from "@/redux/features/authApiSlice";



export default function EditUser() {
    const { data: user, isLoading, isFetching } = useRetrieveUserQuery();
    const token = localStorage.getItem('access');
    const [firstName, setFirstName] = useState(user?.first_name || "");
    const [lastName, setLastName] = useState(user?.last_name || "");

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("first_name", firstName);
        formData.append("last_name", lastName);

        try {
            const response = await fetch(process.env.API_URL + "api/users/me/", {
                method: "PATCH",
                headers: {
                    accept: "application/json",
                    // Authorization: `Bearer ${token}`,
                },
                credentials: "include",
                body: formData,
            });

            if (response.ok) {
                toast.success("Form submitted successfully");
            } else {
                toast.error("Form submission failed");
            }
        } catch (error) {
            toast.error("Form submission failed");
        }
    };

    return (
        <>
            <main className="mx-auto max-w-7xl py-6 my-8 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 gap-6">
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label className="text-sm font-medium text-gray-500">First name</label>
                            <input
                                type="text"
                                className="w-full px-4 py-2 border-2 border-gray-200 hover:shadow-md rounded-md focus:outline-none"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium text-gray-500">Last name</label>
                            <input
                                type="text"
                                className="w-full px-4 py-2 border-2 border-gray-200 hover:shadow-md rounded-md focus:outline-none"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>

                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2" type="submit">Submit</button>
                    </form>
                </div>
            </main>
        </>
    );
};
