'use client'

import getApiUrl from "@/components/api";
import {useRetrieveUserQuery} from "@/redux/features/authApiSlice";


export async function getFavourites() {
    const {data: user} = useRetrieveUserQuery();
    const token = localStorage.getItem('access');


    const response = await fetch(`${getApiUrl()}api/favourite`, {
        method: 'GET',
        body: JSON.stringify({user: user?.id}),
        headers: {
            'Content-Type': 'application/json',
            Authentication: `Bearer ${token}`
        }
    });

    return response.json();
}


export default async function Favourites() {
    const favourites = await getFavourites();

    if (favourites) {
        return (
            <div>
                {favourites.map((favourite: any) => (
                    <div key={favourite.id}>
                        {favourite.id}
                    </div>
                ))}
            </div>
        )
    } else {
        return (
            <div>
                <h2>You don't have any saved offers</h2>
            </div>
        )
    }


}

