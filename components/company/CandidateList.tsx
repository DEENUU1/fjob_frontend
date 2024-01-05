import React, {useEffect, useState} from "react";
import Spinner from "@/components/common/Spinner";
import Link from "next/link";


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
        <>


            <table className="w-full text-sm text-left rtl:text-right">
                <thead className="text-xs">
                <tr>
                    <th scope="col" className="px-6 py-3">
                        Full name
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Email
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Phone
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Created at
                    </th>
                    <th scope="col" className="px-6 py-3">
                        CV
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Status
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Action
                    </th>
                </tr>
                </thead>
                <tbody>

                {candidates && (
                    candidates.map((can: any) => (
                        <tr key={can.id} className="border-b">
                            <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
                                {can.first_name} {can.last_name}
                            </th>
                            <td className="px-6 py-4">
                                {can.email}
                            </td>
                            <td className="px-6 py-4">
                                {can.phone}
                            </td>
                            <td className="px-6 py-4">
                                {can.created_at}
                            </td>
                            <td className="px-6 py-4 font-bold">
                                <Link href={can.cv}>CV</Link>
                            </td>
                            <td className="px-6 py-4 space-x-2">
                                {can.status}
                            </td>
                        </tr>
                    ))
                )}
                </tbody>
            </table>
        </>
    )

}