import RateStats from "@/components/company/OfferRateStat";
import {Suspense} from "react";
import Spinner from "@/components/common/Spinner";
import CandidateStat from "@/components/company/CandidateStat";
import {getIdFromSlug} from "@/components/utils/getIdFromSlug";


interface PageParams {
    slug: string;
}


export default function Page({params}: {params: PageParams}) {
    const offerSlug = params.slug;
    const offerId = getIdFromSlug(offerSlug);

    return (
        <>
            <Suspense fallback={<Spinner/>}>
                <CandidateStat offerId={offerId}/>
            </Suspense>

            <Suspense fallback={<Spinner/>}>
               <RateStats slug={offerSlug}/>
            </Suspense>
        </>
    )
}