'use client'

import Favourites from "@/components/profile/favourite/FavouriteList";
import React, {Suspense, useEffect, useState} from "react";
import Spinner from "@/components/common/Spinner";
import {toast} from "react-toastify";


export default function Page() {
  const [favourites, setFavourites] = useState([]);

  const fetchFavourites = async () => {
    try {
      const response = await fetch(process.env.API_URL + "api/favourite", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: "include"
      });
      const data = await response.json();
      setFavourites(data);
    } catch (error) {
      toast.error("Error fetching favourites");
    }
  };

  useEffect(() => {
    fetchFavourites();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <h1 className="text-center font-bold text-3xl mb-5">Your saved job offers</h1>
        <Suspense fallback={<Spinner />}>
          <Favourites favourites={favourites} updateOnDelete={fetchFavourites} />
        </Suspense>
      </div>
    </main>
  );
}