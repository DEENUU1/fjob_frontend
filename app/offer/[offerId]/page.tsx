import OfferDetails from "@/components/offers/fetchOffer";
import {Suspense} from "react";
// import Loading from "@/components/loading";
import Spinner from "@/components/common/Spinner";

export default function Offer({params}) {
    const offerId = params.offerId;

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">

            <div>
                <Suspense fallback={<Spinner/>}>
                    <OfferDetails offerId={offerId}/>
                </Suspense>
            </div>

        </main>
    )
}