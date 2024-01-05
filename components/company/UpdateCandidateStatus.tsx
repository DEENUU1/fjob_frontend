'use client';

import {useEffect, useState} from "react";

export default function UpdateStatus(currentStatus: string, candidateId: number) {

    const statusType: string[] = ["PENDING", "ACCEPTED", "REJECTED"];

    const [status, setStatus] = useState<string>(currentStatus);

    useEffect(() => {
        fetch(process.env.API_URL +  `api/candidate/candidate/${candidateId}`, {
            method: 'PATCH',
            body: JSON.stringify({"status": status}),
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
                {statusType.map((statusOption) => {
                    if (statusOption !== status || status === "PENDING") {
                        return (
                            <option key={statusOption} value={statusOption}>
                                {statusOption}
                            </option>
                        );
                    } else {
                        return null;
                    }
                })}
            </select>
        </>
    )

}