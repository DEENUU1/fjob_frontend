'use client';

import CandidateList from "@/components/company/CandidateList";
import {useState} from "react";
import CandidateFilter from "@/components/company/CandidateFilter";


interface PageParams {
    id: number;
}


// export async function generateMetadata({params}: {params: PageParams}){
//     const offerData: Promise<Offer> = getOffer(params.slug);
//     const offer = await offerData;
//
//     return {
//         title: "FJob | " + offer.title,
//         description: offer.description,
//     }
// }

export default function Page({params}: {params: PageParams}) {
    const offerId = params.id;
    const [ordering, setOrdering] = useState<string>("-created_at");
    const [status, setStatus] = useState<string>("")

    return (
        <>
        <main className="mx-auto max-w-7xl py-6 my-8 sm:px-6 lg:px-8">
            <div>
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