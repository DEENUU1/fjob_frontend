// 'use client'

// import React, {Suspense, useState} from "react";
import OfferList from "@/components/offer/OfferList";
// import OfferFilters from "@/components/offer/OfferFilters";
// import OfferPagination from "@/components/offer/OfferPagination";
// import offerList from "@/components/offer/OfferList";
import {Search, Remote} from "@/components/offer/Search";


export default async function Page({searchParams}: {searchParams?: {query?: string; is_remote: string}}) {
    const query = searchParams?.query || '';
    const isRemote = searchParams?.is_remote || '';

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div>
                <h1 className="text-center font-bold text-3xl mb-10">Job offers list</h1>

                <Search/>
                <Remote/>

                <OfferList query={query} isRemote={isRemote}/>



                {/*<OfferFilters*/}
                {/*    search={search}*/}
                {/*    isRemote={isRemote}*/}
                {/*    isHybrid={isHybrid}*/}
                {/*    ordering={ordering}*/}
                {/*    experience={experience}*/}
                {/*    workType={workType}*/}
                {/*    employmentType={employmentType}*/}
                {/*    setSearch={setSearch}*/}
                {/*    setIsRemote={setIsRemote}*/}
                {/*    setIsHybrid={setIsHybrid}*/}
                {/*    setOrdering={setOrdering}*/}
                {/*    setExperience={setExperience}*/}
                {/*    setWorkType={setWorkType}*/}
                {/*    setEmploymentType={setEmploymentType}*/}
                {/*/>*/}

                {/*<OfferPagination*/}
                {/*    offers={offerList}*/}
                {/*    page={page}*/}
                {/*    setPage={setPage}*/}
                {/*/>*/}
            </div>
        </main>
    );
}
