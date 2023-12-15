import Favourites from "@/components/profile/FavouriteList";
import {Suspense} from "react";
import Loading from "@/components/loading";


export default async function FavouritePage() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <Suspense fallback={<Loading/>}>
                <Favourites/>
            </Suspense>
        </main>
    )
}
