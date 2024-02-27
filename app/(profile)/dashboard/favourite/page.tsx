import Favourites from "@/components/profile/favourite/FavouriteList";
import React, {Suspense} from "react";
import Spinner from "@/components/common/Spinner";
import {Metadata} from "next";

export const metadata: Metadata = {
  title: 'FJob | Favourites',
}

export default async function Page() {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">

        <div>
          <h1 className="text-center font-bold text-3xl mb-5">Your saved job offers</h1>

          <Suspense fallback={<Spinner/>}>
            <Favourites/>
          </Suspense>

        </div>
      </main>
    </>
  )
}
