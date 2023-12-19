import OfferDetails from "@/components/offer/fetchOffer";
import {Suspense} from "react";
// import Loading from "@/components/loading";
import Spinner from "@/components/common/Spinner";

export default function Offer({params}) {
    const offerId = params.offerId;

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">

            <div>
                <h1>{offerId}</h1>
                {/*<Suspense fallback={<Spinner/>}>*/}
                    {/*<OfferDetails id={slug}/>*/}
                {/*</Suspense>*/}
            </div>

        </main>
    )
}