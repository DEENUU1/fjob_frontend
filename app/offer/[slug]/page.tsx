import OfferDetails from "@/components/offer/fetchOffer";
import {Suspense} from "react";
import Spinner from "@/components/common/Spinner";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: 'FJob | Offer details',
}


interface PageParams {
    slug: string;
}


export default function Page({params}: {params: PageParams}) {
    const slug = params.slug;

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">

            <div>
                <Suspense fallback={<Spinner/>}>
                    <OfferDetails slug={slug}/>
                </Suspense>
            </div>

        </main>
    )
}