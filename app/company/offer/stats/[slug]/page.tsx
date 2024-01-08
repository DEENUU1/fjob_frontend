import RateStats from "@/components/company/OfferRateStat";
import {Suspense} from "react";
import Spinner from "@/components/common/Spinner";


interface PageParams {
    slug: string;
}


export default function Page({params}: {params: PageParams}) {
    const offerSlug = params.slug;

    return (
        <>
            <Suspense fallback={<Spinner/>}>
               <RateStats slug={offerSlug}/>
            </Suspense>
        </>
    )
}