import RateStats from "@/components/company/OfferRateStat";
import {Suspense} from "react";
import Spinner from "@/components/common/Spinner";
import CandidateStat from "@/components/company/CandidateStat";
import {getIdFromSlug} from "@/components/utils/getIdFromSlug";


interface PageParams {
  slug: string;
}


export default function Page({params}: { params: PageParams }) {
  const offerSlug = params.slug;
  const offerId = getIdFromSlug(offerSlug);

  return (
    <>
      <main className="mx-auto max-w-7xl py-6 my-8 sm:px-6 lg:px-8">

        <h2 className="text-xl">Candidates stats</h2>
        <Suspense fallback={<Spinner/>}>
          <CandidateStat offerId={offerId}/>
        </Suspense>

        <h2 className="text-xl">Offer rate stats</h2>
        <Suspense fallback={<Spinner/>}>
          <RateStats slug={offerSlug}/>
        </Suspense>
      </main>
    </>
  )
}