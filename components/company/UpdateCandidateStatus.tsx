'use client';

import {useEffect, useState} from "react";

export default function UpdateStatus({currentStatus, candidateId}: {currentStatus: string, candidateId: string}) {

    const statusType: string[] = ["PENDING", "ACCEPTED", "REJECTED"];

    const [status, setStatus] = useState<string>(currentStatus);

    useEffect(() => {
        fetch(process.env.API_URL +  `api/candidate/candidate/${candidateId}/`, {
            method: 'PATCH',
            body: JSON.stringify({"status": status}),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('access')}`,
            }
        })
            .then(response => response.json())
    }, [status, candidateId]);

    const handleStatusUpdate = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedStatus = event.target.value;
        setStatus(selectedStatus);
    }

    return (
        <>
            <select onChange={handleStatusUpdate} value={status}
                    className={`${
                        status === 'PENDING'
                        ? 'text-gray-700 font-bold'
                        : status === 'REJECTED'
                        ? 'text-red-700 font-bold' 
                        : status === 'ACCEPTED'
                        ? 'text-green-700 font-bold' 
                        : ''
                    }`}
            >
                {statusType.map((statusOption) => (
                    <option key={statusOption} value={statusOption}
                            className={`${
                            statusOption === 'PENDING'
                            ? 'text-gray-700 font-bold'
                            : statusOption === 'REJECTED'
                            ? 'text-red-700 font-bold'
                            : statusOption === 'ACCEPTED'
                            ? 'text-green-700 font-bold'
                            : ''
                            }`}
                    >
                        {statusOption}
                    </option>
                ))}
            </select>
        </>
    )

}