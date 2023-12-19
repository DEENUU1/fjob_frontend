'use client';

import { useRetrieveUserQuery } from '@/redux/features/authApiSlice';
// import Spinner from '@/components/common/Spinner';
// import List from '@/components/common/List';
// import {useState, useEffect} from "react";
// import getApiUrl from "@/components/api";
// import { useRouter } from 'next/navigation';
// import {toast} from "react-toastify";
import {useState} from "react";
import getApiUrl from "@/components/api";
import {toast} from "react-toastify";

export default function Page() {
    const { data: user, isLoading, isFetching } = useRetrieveUserQuery();

    return (
        <>
            <main className="mx-auto max-w-7xl py-6 my-8 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 gap-6">

                    <h1>Company</h1>
                </div>
            </main>
        </>
    );
}