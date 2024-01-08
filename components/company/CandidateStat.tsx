'use client';

import {useEffect, useState} from "react";


function getCandidateStat(offerId: number){
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [stat, setStat] = useState<any>(null);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        fetch(process.env.API_URL + `api/candidate/candidate/${offerId}/stat`, {
            credentials: "include",
        })
            .then((res) => res.json())
            .then((data) => setStat(data))
    }, [offerId])

    return stat
}


export default function CandidateStat({offerId}: {offerId: number}) {

    const stat = getCandidateStat(offerId);

    return (
        <div className="max-w-full mx-4 py-6 sm:mx-auto sm:px-6 lg:px-8">
            <div className="sm:flex sm:space-x-4">
                <div
                    className="inline-block hover:shadow-xl align-bottom bg-white rounded-lg text-left overflow-hidden shadow transform transition-all mb-4 w-full sm:w-1/3 sm:my-8">
                    <div className="bg-white p-5">
                        <div className="sm:flex sm:items-start">
                            <div className="text-center sm:mt-0 sm:ml-2 sm:text-left">
                                <h3 className="text-sm leading-6 font-medium text-gray-400">Total candidates</h3>
                                <p className="text-3xl font-bold text-black">{stat?.count}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className="inline-block hover:shadow-xl align-bottom bg-white rounded-lg text-left overflow-hidden shadow transform transition-all mb-4 w-full sm:w-1/3 sm:my-8">
                    <div className="bg-gray-300 p-5">
                        <div className="sm:flex sm:items-start">
                            <div className="text-center sm:mt-0 sm:ml-2 sm:text-left">
                                <h3 className="text-sm leading-6 font-medium text-gray-900">Pending</h3>
                                <p className="text-3xl font-bold text-black">{stat?.pending}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className="inline-block hover:shadow-xl align-bottom bg-white rounded-lg text-left overflow-hidden shadow transform transition-all mb-4 w-full sm:w-1/3 sm:my-8">
                    <div className="bg-red-300 p-5">
                        <div className="sm:flex sm:items-start">
                            <div className="text-center sm:mt-0 sm:ml-2 sm:text-left">
                                <h3 className="text-sm leading-6 font-medium text-gray-900">Rejected</h3>
                                <p className="text-3xl font-bold text-black">{stat?.rejected}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className="inline-block hover:shadow-xl align-bottom bg-white rounded-lg text-left overflow-hidden shadow transform transition-all mb-4 w-full sm:w-1/3 sm:my-8">
                    <div className="bg-green-300 p-5">
                        <div className="sm:flex sm:items-start">
                            <div className="text-center sm:mt-0 sm:ml-2 sm:text-left">
                                <h3 className="text-sm leading-6 font-medium text-gray-900">Accepted</h3>
                                <p className="text-3xl font-bold text-black">{stat?.accepted}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}