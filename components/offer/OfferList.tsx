
// import React, {useEffect, useState} from "react";
import OfferCard from "@/components/offer/OfferCard";
// import Spinner from "@/components/common/Spinner";


async function getOfferList(query: string, isRemote: string, isHybrid: string, ordering: string, workType: string, experienceType: string){
    let url = process.env.API_URL + `api/offer/offer/?is_remote=${isRemote}&search=${query}&is_hybrid=${isHybrid}&ordering=${ordering}`
    if (workType !== ""){
        url += `&work_type=${workType}`
    }
    if (experienceType !== ""){
        url += `&experience=${experienceType}`
    }

    const response = await fetch(url)
    return response.json();
}


export default async function OfferList({query, isRemote, isHybrid, ordering, workType, experienceType}: {query: string, isRemote: string, isHybrid: string, ordering: string, workType: string, experienceType: string}) {
    const data = await getOfferList(query, isRemote, isHybrid, ordering, workType, experienceType);

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
