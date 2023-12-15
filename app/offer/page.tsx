'use client'

import OfferCard from "@/components/offers/fetchOfferList";
import {Suspense} from "react";
import Loading from "@/components/loading";
import React, { useContext, useEffect, useState } from "react"
import getApiUrl from "@/components/api";


export default function Offers() {
    const [offers, setOffers] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isRemote, setIsRemote] = useState("");
    const [isHybrid, setIsHybrid] = useState("");
    console.log(isRemote);
    console.log(isHybrid);

    useEffect(() => {
        fetch(`${getApiUrl()}api/offer/offer?is_remote=${isRemote}&is_hybrid=${isHybrid}`)
            .then(response => response.json())
            .then(data => {
                setOffers(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, [isRemote, isHybrid]);

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


            <label htmlFor="is_remote" className="mr-2">Is remote:</label>
            <input type="checkbox" id="is_remote" checked={isRemote === "true"} onChange={(e) => setIsRemote(e.target.checked ? "true" : "")}/>

            <label htmlFor="is_hybrid" className="mr-2">Is hybrid:</label>
            <input type="checkbox" id="is_hybrid" checked={isHybrid === "true"} onChange={(e) => setIsHybrid(e.target.checked ? "true" : "") }/>


            <h1 className="text-center font-bold text-3xl mb-10">Job offers list</h1>
            {offers.results.map((offer: any) => (
                <OfferCard key={offer.id} offer={offer}/>
            ))}

        </main>
    )
}