import AddOffer from "@/components/company/AddOfferButton";
import {Suspense} from "react";
import Spinner from '@/components/common/Spinner';
import OfferList from "@/components/company/CompanyOfferList";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: 'FJob | Dashboard offers',
}

export default async function Page() {
    return (
        <>
            <main className="mx-auto max-w-7xl py-6 my-8 sm:px-6 lg:px-8">

                <div>
                    <Suspense fallback={<Spinner/>}>
                        <AddOffer/>
                    </Suspense>

                    <h3 className="text-2xl mt-5 mb-5">Offers</h3>

                    <Suspense fallback={<Spinner/>}>
                        <OfferList/>
                    </Suspense>
                </div>
            </main>
        </>
    )
}