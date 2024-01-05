import Favourites from "@/components/profile/favourite/FavouriteList";
import React, {Suspense} from "react";
import Spinner from "@/components/common/Spinner";
import {Metadata} from "next";
import AppliedOffers from "@/components/profile/AppliedOffers";

export const metadata: Metadata = {
    title: 'FJob | Applied offers',
}

export default async function Page() {
    return (
        <>
            <main className="flex min-h-screen flex-col items-center justify-between p-24">

                <div>
                    <h1 className="text-center font-bold text-3xl mb-5">Offers on which you applied</h1>

                    <Suspense fallback={<Spinner/>}>
                        <AppliedOffers/>
                    </Suspense>

                </div>
            </main>
        </>
    )
}
