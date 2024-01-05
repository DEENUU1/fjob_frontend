'use client';

import CandidateList from "@/components/company/CandidateList";
import {useState} from "react";

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
        <main className="flex min-h-screen flex-col items-center justify-between p-24">

            <div>

                <CandidateList offerId={offerId} ordering={ordering} status={status}/>

            </div>

        </main>
    )
}