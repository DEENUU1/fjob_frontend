
// import React, {useEffect, useState} from "react";
import OfferCard from "@/components/offer/OfferCard";
// import Spinner from "@/components/common/Spinner";


async function getOfferList(query: string, isRemote: string){
    const response = await fetch(process.env.API_URL + `api/offer/offer/?is_remote=${isRemote}&search=${query}`)
    return response.json();
}


export default async function OfferList({query, isRemote}: {query: string, isRemote: string}) {
    const data = await getOfferList(query, isRemote);

    console.log(data);
    return (
        <div>
            <div className="mt-20">
                {data.results.map((offer: any) => (
                    <OfferCard key={offer.title} offer={offer}/>
                ))}
            </div>
        </div>
    );
}
