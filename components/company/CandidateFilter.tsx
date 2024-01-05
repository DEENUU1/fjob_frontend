import React, {Dispatch, SetStateAction} from "react";


export default function CandidateFilter(
    {
        ordering,
        status,
        setOrdering,
        setStatus,
    }:{
        ordering: string,
        status: string,
        setOrdering: Dispatch<SetStateAction<string>>,
        setStatus: Dispatch<SetStateAction<string>>,
    }){

    const orderingTypes = new Map();
    orderingTypes.set("Newest", "-created_at");
    orderingTypes.set("Oldest", "created_at");

    const statusType: string[] = ["PENDING", "ACCEPTED", "REJECTED"];

    return (
        <>
            <div className="lg:flex lg:space-x-4 lg:items-center lg:mb-4">
                <label htmlFor="ordering">
                    Sort by:
                </label>
                <select
                    id="ordering"
                    value={ordering}
                    onChange={(e) => setOrdering(e.target.value)}
                >
                    {Array.from(orderingTypes.keys()).map((key) => (
                        <option key={key} value={orderingTypes.get(key)}>
                            {key}
                        </option>
                    ))}
                </select>

                <label htmlFor="status">
                    Status
                </label>
                <select
                    id="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    {statusType.map((statusOption) => (
                        <option key={statusOption} value={statusOption}>
                            {statusOption}
                        </option>
                    ))}
                </select>

            </div>
        </>
    )

}