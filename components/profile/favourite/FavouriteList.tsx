'use client'

import getApiUrl from "@/components/api";
import FavouriteButtonDelete from "./favouriteDelete";
import Link from "next/link";


export async function getFavourites() {
    const token = localStorage.getItem('access');

    const response = await fetch(process.env.API_URL + "api/favourite", {
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
        <div className="flex flex-col">
            {favourites.map((favourite: any) => (
                <>
                    <div className="flex flex-row border-2 border-black border-opacity-50 rounded-2xl hover:border-opacity-75 mb-2 p-5">
                        <div>
                            <Link href={`/offer/${favourite.offer.id}`}>
                                <h2 className="text-xl">{favourite.offer.title}</h2>
                            </Link>
                        </div>
                        <FavouriteButtonDelete offerId={favourite.id}/>
                    </div>
                </>
            ))}
        </div>
    )
}

