'use client'

import Favourites from "@/components/profile/favourite/FavouriteList";
import React, {Suspense, useEffect, useState} from "react";
import Spinner from "@/components/common/Spinner";


export default function Page() {
  const [favourites, setFavourites] = useState([])

  const handleFavouriteFetch = () => {
    fetch(process.env.API_URL + "api/favourite", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: "include"
    })
      .then(response => response.json())
      .then(data => setFavourites(data));
  }

  useEffect(() => {
    handleFavouriteFetch();
  }, []);


  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div>
          <h1 className="text-center font-bold text-3xl mb-5">Your saved job offers</h1>
          <Suspense fallback={<Spinner/>}>
            <Favourites favourites={favourites} updateOnDelete={handleFavouriteFetch}/>
          </Suspense>
        </div>
      </main>
    </>
  )
}
