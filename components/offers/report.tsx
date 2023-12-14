'use client'

import {useState} from "react";
import {FaFlag} from "react-icons/fa";
import getApiUrl from "@/components/api";
import { toast } from 'react-toastify';
import {useRetrieveUserQuery} from "@/redux/features/authApiSlice";
import {Fa0} from "react-icons/fa6";


const ReportModal = ({offerId}) => {
    const [description, setDescription] = useState('')
    const {data: user} = useRetrieveUserQuery()
    const [showModal , setShowModal] = useState(false);
    const token = localStorage.getItem('access')

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setShowModal(false);

        // const formData = new FormData();
        // formData.append('description', description);
        // formData.append('offer', offerId);
        // formData.append('user', user.id);

        try {
            const response = await fetch(`${getApiUrl()}/api/support/report/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({"offer": offerId, "user": user.id, "description": description})
            })

            if (response.ok){
                toast.success("Report sent!")
            } else {
                toast.error("Something went wrong!")
            }
        } catch (error) {
            toast.error("Error!")
            console.log(error);
        }

    }

    return (
        <>
            <button
                className="ease-linear transition-all duration-150"
                type="button"
                onClick={() => setShowModal(true)}
            >
                <FaFlag/>
            </button>

            {showModal ? (
                <>
                    <form onSubmit={handleSubmit}>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                                    <h3 className="text-3xl font-semibold">
                                        Tell us what is wrong with this job offer
                                    </h3>
                                    <button
                                        className="p-1 ml-auto  border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setShowModal(false)}
                                    >
                <span className=" text-black  h-6 w-6 text-2xl block outline-none focus:outline-none">
                  ×
                </span>
                                    </button>
                                </div>
                                {/*body*/}
                                <div className="relative p-6 flex-auto">
                                    <input
                                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        id="description"
                                        type="text"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </div>
                                {/*footer*/}
                                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                    <button
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Close
                                    </button>
                                    <button
                                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="submit"
                                        onClick={() => (false)}
                                    >
                                        Send
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div></div>
                    </form>
                </>
            ) : null}
        </>
    )
}

export default ReportModal;
