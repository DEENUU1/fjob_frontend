'use client'

import getApiUrl from "@/components/api";
import {useRetrieveUserQuery} from "@/redux/features/authApiSlice";
import FavouriteButtonDelete from "./favouriteDelete";
import favouriteDelete from "./favouriteDelete";

export async function getFavourites() {
    const {data: user} = useRetrieveUserQuery();
    const token = localStorage.getItem('access');


    const response = await fetch(`${getApiUrl()}api/favourite`, {
        method: 'GET',
        // body: JSON.stringify({user: user?.id}),
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
                    {favourite.id}
                    <FavouriteButtonDelete offerId={favourite.id}/>
                </div>
            ))}
        </div>
    )


}

