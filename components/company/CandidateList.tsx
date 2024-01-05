import React, {useEffect, useState} from "react";
import Spinner from "@/components/common/Spinner";


export default function CandidateList(
    {
        offerId,
        ordering,
        status
    }: {
        offerId: number,
        ordering: string,
        status: string,
    }){

    const [candidates, setCandidates] = useState([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        let url = `api/candidate/candidate/offer/${offerId}?status=${status}&ordering=${ordering}`;

        fetch(process.env.API_URL + url)
            .then((response) => response.json())
            .then((data) => {
                setCandidates(data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            })

    }, [offerId, status, ordering]);

    if (loading || error || !candidates) {
        return (
            <main className="flex min-h-screen flex-col items-center justify-between p-24">
                <Spinner/>;
            </main>
        );
    }

    return (
        <div>
            <div className="mt-20">
                {candidates.map((candidate: any) => (
                    <h1 key={candidate.id}>{candidate.first_name}</h1>
                ))}
            </div>
        </div>
    )

}