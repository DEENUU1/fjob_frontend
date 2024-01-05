import OfferDetails from "@/components/offer/FetchOffer";
import {Suspense} from "react";
import Spinner from "@/components/common/Spinner";


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

export default async function Page({params}: {params: PageParams}) {
    const offerId = params.id;

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">

            <div>
                <Suspense fallback={<Spinner/>}>

                </Suspense>
            </div>

        </main>
    )
}