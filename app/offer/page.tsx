'use client'

import React, {Suspense, useState} from "react";
import OfferList from "../../components/offers/OfferList";
import OfferFilters from "../../components/offers/OfferFilters";
import OfferPagination from "../../components/offers/OfferPagination";
import offerList from "../../components/offers/OfferList";

function Offers() {
    const [isRemote, setIsRemote] = useState("");
    const [isHybrid, setIsHybrid] = useState("");
    const [ordering, setOrdering] = useState("-created_at");
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [experience, setExperience] = useState("All");
    const [workType, setWorkType] = useState("All");
    const [employmentType, setEmploymentType] = useState("All");

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

            <OfferPagination offers={offerList} page={page} setPage={setPage} />
            </div>
        </main>
    );
}

export default Offers;
