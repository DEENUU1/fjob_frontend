
import AddOffer from "@/components/company/addOfferButton";
import {Suspense} from "react";
import Spinner from '@/components/common/Spinner';
import OfferList from "@/components/company/companyOfferList";


export default async function Page() {
    return (
        <>
            <main className="mx-auto max-w-7xl py-6 my-8 sm:px-6 lg:px-8">

                <div>
                    <Suspense fallback={<Spinner/>}>
                        <AddOffer/>
                    </Suspense>

                    <h1 className="text-2xl">Offers</h1>

                    <Suspense fallback={<Spinner/>}>
                        <OfferList/>
                    </Suspense>
                </div>
            </main>
        </>
    )
}