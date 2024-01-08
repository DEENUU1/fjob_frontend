'use client';

import CandidateList from "@/components/company/CandidateList";
import {useState} from "react";
import CandidateFilter from "@/components/company/CandidateFilter";
import CandidateStat from "@/components/company/CandidateStat";


interface PageParams {
    id: number;
}


export default function Page({params}: {params: PageParams}) {
    const offerId = params.id;
    const [ordering, setOrdering] = useState<string>("-created_at");
    const [status, setStatus] = useState<string>("")

    return (
        <>
        <main className="mx-auto max-w-7xl py-6 my-8 sm:px-6 lg:px-8">
            <div>
                <div>
                    <CandidateStat offerId={offerId}/>
                </div>

                <CandidateFilter
                    ordering={ordering}
                    status={status}
                    setOrdering={setOrdering}
                    setStatus={setStatus}
                />

                <div>
                    <CandidateList
                        offerId={offerId}
                        ordering={ordering}
                        status={status}
                    />
                </div>
            </div>
        </main>
        </>
    )
}