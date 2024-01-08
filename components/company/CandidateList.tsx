'use client';

import React, {useEffect, useState} from "react";
import Spinner from "@/components/common/Spinner";
import Link from "next/link";
import UpdateStatus from "@/components/company/UpdateCandidateStatus";
import CandidateDetailsDialog from "@/components/company/CandidateDetails";

export default function CandidateList(
    {
        offerId,
        futureRecruitment,
        ordering,
        status
    }: {
        offerId: number,
        futureRecruitment: string,
        ordering: string,
        status: string,
    }){

    const [candidates, setCandidates] = useState([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let url = `api/candidate/candidate/offer/${offerId}?status=${status}&ordering=${ordering}&future_recruitment=${futureRecruitment}`;

        fetch(process.env.API_URL + url, {
            // headers: {
            //     Authorization: `Bearer ${localStorage.getItem('access')}`
            // }
            credentials: "include"

        })
            .then((response) => response.json())
            .then((data) => {
                setCandidates(data.results);
                setLoading(false);
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            })

    }, [offerId, status, ordering, futureRecruitment]);

    if (loading || error || !candidates) {
        return (
            <main className="flex min-h-screen flex-col items-center justify-between p-24">
                <Spinner/>;
            </main>
        );
    }
    return (
        <>
            <div>
                <h3 className="text-2xl mt-5 mb-5">Candidates</h3>

                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">

                    <table className="w-full text-sm text-left rtl:text-right table-auto">
                        <thead className="text-xs">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Id
                            </th>
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
                                Future recruitment
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Details
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {candidates && (
                            candidates.map((can: any) => (
                                <tr key={can.id} className="border-b">
                                    <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
                                        {can.id}
                                    </th>
                                    <td className="px-6 py-4">
                                        {can.first_name} {can.last_name}
                                    </td>
                                    <td className="px-6 py-4 text-blue-500 hover:underline cursor-pointer">
                                        <a href={`mailto: ${can.email}`}>{can.email}</a>
                                    </td>
                                    <td className="px-6 py-4">
                                        {can.phone}
                                    </td>
                                    <td className="px-6 py-4">
                                        {can.created_at}
                                    </td>
                                    <td className="px-6 py-4 font-bold">
                                        <Link className="text-blue-500 hover:underline cursor-pointer"
                                              href={can.cv}>CV</Link>
                                    </td>
                                    <td className="px-6 py-4 space-x-2">
                                        <UpdateStatus currentStatus={can.status} candidateId={can.id}/>
                                    </td>
                                    <td className="px-6 py-4 space-x-2">
                                        {can.future_recruitment ? "Yes" : "No"}
                                    </td>
                                    <td className="px-6 py-4 space-x-2">
                                        <CandidateDetailsDialog message={can.message} futureRecruitment={can.future_recruitment}/>
                                    </td>
                                </tr>
                            ))
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )

}