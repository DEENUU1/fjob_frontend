'use client'

import getApiUrl from "@/components/api";
import FavouriteButtonDelete from "./favouriteDelete";

export async function getFavourites() {
    const token = localStorage.getItem('access');

    const response = await fetch(`${getApiUrl()}api/favourite`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    });

    return response.json();
}


export default async function Favourites() {
    const favourites = await getFavourites();

    return (
        <div>
            {favourites.map((favourite: any) => (
                <div key={favourite.id}>
                    <h2>{favourite.offer.title}</h2>
                    <FavouriteButtonDelete offerId={favourite.id}/>
                </div>
            ))}
        </div>
    )
}

