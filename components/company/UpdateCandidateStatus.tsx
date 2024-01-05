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
            .then(data => {
                console.log(data);
            })
    }, [status, candidateId]);

    const handleStatusUpdate = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedStatus = event.target.value;
        setStatus(selectedStatus);
    }

    return (
        <>
            <select onChange={handleStatusUpdate} value={status}>
                {statusType.map((statusOption) => (
                    <option key={statusOption} value={statusOption}>
                        {statusOption}
                    </option>
                ))}
            </select>
        </>
    )

}