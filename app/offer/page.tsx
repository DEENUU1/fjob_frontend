'use client'

import OfferCard from "@/components/offers/fetchOfferList";
import React, { useEffect, useState } from "react"
import getApiUrl from "@/components/api";
import Spinner from "@/components/common/Spinner";
import getEmploymentTypes from "@/components/offers/employmentType";
import getWorkType from "@/components/offers/workType";
import getExperiences from "@/components/offers/experience";


export default function Offers() {
    const [offers, setOffers] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isRemote, setIsRemote] = useState("");
    const [isHybrid, setIsHybrid] = useState("");
    const [ordering, setOrdering] = useState("-created_at");
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [experience, setExperience] = useState(null);
    const [workType, setWorkType] = useState(null);
    const [employmentType, setEmploymentType] = useState(null);

    const nextPage = offers?.next;
    const previousPage = offers?.previous;
    const orderingTypes = new Map();
    orderingTypes.set("Newest", "-created_at");
    orderingTypes.set("Oldest", "created_at");
    orderingTypes.set("Lowest salary", "salary__salary_from");
    orderingTypes.set("Highest salary", "-salary__salary_from");

    const experiences = getExperiences();
    const workTypes = getWorkType();
    const employmentTypes = getEmploymentTypes();

    useEffect(() => {
        let url = `api/offer/offer?is_remote=${isRemote}&is_hybrid=${isHybrid}&ordering=${ordering}&search=${search}&p=${page}`


        if (experience !== null && experience !== "All") {
            url += `&experience=${experience}`;
        }

        if (workType !== null && workType !== "All") {
            url += `&work_type=${workType}`;
        }

        if (employmentType !== null && employmentType !== "All") {
            url += `&employment_type=${employmentType}`;
        }

        fetch(`${getApiUrl()}${url}`)
            .then(response => response.json())
            .then(data => {
                setOffers(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, [isRemote, isHybrid, ordering, search, page, experience, workType, employmentType]);

    if (loading || error || !offers) {
        return (
            <main className="flex min-h-screen flex-col items-center justify-between p-24">
                <Spinner/>;
            </main>
        )
    }

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


                <div className="flex flex-row mt-10 gap-4">
                    <label className="font-medium p-2" htmlFor="is_hybrid">Experience</label>
                    <select className="bg-gray-50 font-medium p-2" id="experience" value={experience} onChange={(e) => setExperience(e.target.value)}>
                        <option value="All">All</option>
                        {experiences.map((experience: any) => (
                            <option key={experience.id} value={experience.id}>{experience.name}</option>
                        ))}
                    </select>

                    <label className="font-medium p-2" htmlFor="is_hybrid">Work type</label>
                    <select className="bg-gray-50 font-medium p-2" id="work_type" value={workType} onChange={(e) => setWorkType(e.target.value)}>
                        <option value="All">All</option>
                        {workTypes.map((workType: any) => (
                            <option key={workType.id} value={workType.id}>{workType.name}</option>
                        ))}
                    </select>

                    <label className="font-medium p-2" htmlFor="is_hybrid">Employment type</label>
                    <select className="bg-gray-50 font-medium p-2" id="employment_type" value={employmentType} onChange={(e) => setEmploymentType(e.target.value)}>
                        <option value="All">All</option>
                        {employmentTypes.map((employmentType: any) => (
                            <option key={employmentType.id} value={employmentType.id}>{employmentType.name}</option>
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
                            {previousPage && (
                                <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                    onClick={() => setPage(page - 1)}
                                >
                                    Previous
                                </button>
                            )}
                            {nextPage && (
                                <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                    onClick={() => setPage(page + 1)}
                                >
                                    Next
                                </button>
                            )}
                        </div>
                    ) : (
                        // Display only the 'Next' button if the page is 1 and there is a next page
                        nextPage && (
                            <div className="flex justify-center mt-10">
                                <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                    onClick={() => setPage(page + 1)}
                                >
                                    Next
                                </button>
                            </div>
                        )
                    )}
                </div>

            </div>
        </main>
    );
};