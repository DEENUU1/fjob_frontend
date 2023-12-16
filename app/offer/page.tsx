'use client'

import OfferCard from "@/components/offers/fetchOfferList";
import Loading from "@/components/loading";
import React, { useEffect, useState } from "react"
import getApiUrl from "@/components/api";
import Spinner from "@/components/common/Spinner";

export default function Offers() {
    const [offers, setOffers] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isRemote, setIsRemote] = useState("");
    const [isHybrid, setIsHybrid] = useState("");
    const [ordering, setOrdering] = useState("-created_at");
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);


    const orderingTypes = new Map();
    orderingTypes.set("Newest", "-created_at");
    orderingTypes.set("Oldest", "created_at");
    orderingTypes.set("Lowest salary", "salary__salary_from");
    orderingTypes.set("Highest salary", "-salary__salary_from");


    useEffect(() => {
        fetch(`${getApiUrl()}api/offer/offer?is_remote=${isRemote}&is_hybrid=${isHybrid}&ordering=${ordering}&search=${search}&p=${page}`)
            .then(response => response.json())
            .then(data => {
                setOffers(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, [isRemote, isHybrid, ordering, search, page]);

    if (loading || error || !offers) {
        return (
            <main className="flex min-h-screen flex-col items-center justify-between p-24">
                <Spinner/>;
            </main>
        )
    }

    const count = offers.count;
    const nextPage = offers.next;
    const previousPage = offers.previous;

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="">
                <h1 className="text-center font-bold text-3xl mb-10">Job offers list</h1>

                <div className="flex flex-row mt-10 gap-4">
                    <input type="text" id="search" className="border-2 border-gray-700 bg-gray-50 rounded-2xl font-medium focus:ring-blue-400 p-2" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)}/>

                    <label className="font-medium p-2" htmlFor="is_remote">Is remote:</label>
                    <input className="font-medium " type="checkbox" id="is_remote" checked={isRemote === "true"} onChange={(e) => setIsRemote(e.target.checked ? "true" : "")}/>

                    <label className="font-medium p-2" htmlFor="is_hybrid">Is hybrid:</label>
                    <input type="checkbox" id="is_hybrid" checked={isHybrid === "true"} onChange={(e) => setIsHybrid(e.target.checked ? "true" : "") }/>

                    <label className="font-medium p-2" htmlFor="ordering">Sort by:</label>
                    <select className="bg-gray-50 font-medium p-2" id="ordering" value={ordering} onChange={(e) => setOrdering(e.target.value)}>
                        {Array.from(orderingTypes.keys()).map((key) => (
                            <option key={key} value={orderingTypes.get(key)}>{key}</option>
                        ))}
                    </select>
                </div>

                <div className="mt-20">
                    {offers.results.map((offer: any) => (
                        <OfferCard key={offer.title} offer={offer}/>
                    ))}
                </div>

                <div>
                    {offers.count > 1 && page > 1 ? (
                        <div className="flex justify-center mt-10 gap-2">
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                onClick={() => setPage(page - 1)}
                            >
                                Previous
                            </button>
                            {offers.count !== page && (
                                <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                    onClick={() => setPage(page + 1)}
                                >
                                    Next
                                </button>
                            )}
                        </div>
                    ) : (
                        // Display only the "Next" button if the page is 1
                        <div className="flex justify-center mt-10">
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                onClick={() => setPage(page + 1)}
                            >
                                Next
                            </button>
                        </div>
                    )}



                </div>
            </div>
        </main>
    );
};