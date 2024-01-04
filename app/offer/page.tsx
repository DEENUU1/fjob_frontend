'use client'

import React, {Suspense, useState} from "react";
import OfferList from "@/components/offer/OfferList";
import OfferFilters from "@/components/offer/OfferFilters";
import OfferPagination from "@/components/offer/OfferPagination";
import offerList from "@/components/offer/OfferList";


export default function Page() {
    const [isRemote, setIsRemote] = useState<string>("");
    const [isHybrid, setIsHybrid] = useState<string>("");
    const [ordering, setOrdering] = useState<string>("-created_at");
    const [search, setSearch] = useState<string>("");
    const [page, setPage] = useState<number>(1);
    const [experience, setExperience] = useState<string>("All");
    const [workType, setWorkType] = useState<string>("All");
    const [employmentType, setEmploymentType] = useState<string>("All");

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="">
                <h1 className="text-center font-bold text-3xl mb-10">Job offers list</h1>

                <OfferFilters
                    search={search}
                    isRemote={isRemote}
                    isHybrid={isHybrid}
                    ordering={ordering}
                    experience={experience}
                    workType={workType}
                    employmentType={employmentType}
                    setSearch={setSearch}
                    setIsRemote={setIsRemote}
                    setIsHybrid={setIsHybrid}
                    setOrdering={setOrdering}
                    setExperience={setExperience}
                    setWorkType={setWorkType}
                    setEmploymentType={setEmploymentType}
                />

                <OfferList
                    isRemote={isRemote}
                    isHybrid={isHybrid}
                    ordering={ordering}
                    search={search}
                    page={page}
                    experience={experience}
                    workType={workType}
                    employmentType={employmentType}
                />

                <OfferPagination
                    offers={offerList}
                    page={page}
                    setPage={setPage}
                />
            </div>
        </main>
    );
}
