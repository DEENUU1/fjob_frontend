'use client'

import OfferCard from "@/components/offers/fetchOfferList";
import Loading from "@/components/loading";
import React, { useEffect, useState } from "react"
import getApiUrl from "@/components/api";


export default function Offers() {
    const [offers, setOffers] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isRemote, setIsRemote] = useState("");
    const [isHybrid, setIsHybrid] = useState("");
    const [ordering, setOrdering] = useState("created_at");
    const [search, setSearch] = useState("");


    const orderingTypes = new Map();
    orderingTypes.set("Newest", "created_at");
    orderingTypes.set("Oldest", "-created_at");
    orderingTypes.set("Lowest salary", "salary__salary_from");
    orderingTypes.set("Highest salary", "-salary__salary_from");


    useEffect(() => {
        fetch(`${getApiUrl()}api/offer/offer?is_remote=${isRemote}&is_hybrid=${isHybrid}&ordering=${ordering}&search=${search}`)
            .then(response => response.json())
            .then(data => {
                setOffers(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, [isRemote, isHybrid, ordering, search]);

    if (loading) {
        return <Loading/>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }


    if (!offers) {
        return <p>No offers found.</p>;
    }



    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">

            <label htmlFor="search"> Search</label>
            <input type="text" id="search" value={search} onChange={(e) => setSearch(e.target.value)}/>

            <label htmlFor="is_remote" className="mr-2">Is remote:</label>
            <input type="checkbox" id="is_remote" checked={isRemote === "true"} onChange={(e) => setIsRemote(e.target.checked ? "true" : "")}/>

            <label htmlFor="is_hybrid" className="mr-2">Is hybrid:</label>
            <input type="checkbox" id="is_hybrid" checked={isHybrid === "true"} onChange={(e) => setIsHybrid(e.target.checked ? "true" : "") }/>


            <label htmlFor="ordering">Sort by:</label>
            <select id="ordering" value={ordering} onChange={(e) => setOrdering(e.target.value)}>
                {Array.from(orderingTypes.keys()).map((key) => (
                    <option key={key} value={orderingTypes.get(key)}>{key}</option>
                ))}
            </select>


            <h1 className="text-center font-bold text-3xl mb-10">Job offers list</h1>

            {offers.results.map((offer: any) => (
                <OfferCard key={offer.id} offer={offer}/>
            ))}

        </main>
    )
}