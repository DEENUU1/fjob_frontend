import Favourites from "@/components/profile/FavouriteList";
import React, {Suspense} from "react";
import Spinner from "@/components/common/Spinner";

export default async function FavouritePage() {
    return (
        <>
            <main className="flex min-h-screen flex-col items-center justify-between p-24">

                <div>
                    <h1 className="text-center font-bold text-2xl mb-5">Your saved job offers</h1>

                    <Suspense fallback={<Spinner/>}>
                        <Favourites/>
                    </Suspense>

                </div>
            </main>
        </>
    )
}
