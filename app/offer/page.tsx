import OfferList from "@/components/offers/fetchOfferList";
import {Suspense} from "react";
import Loading from "@/components/loading";


export default function Offers() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">

        <div>
            <h1 className="text-center font-bold text-3xl mb-10">Job offers list</h1>
            <Suspense fallback={<Loading/>}>
                <OfferList/>
            </Suspense>
        </div>

        </main>
    )
}