import { useRetrieveUserQuery } from '@/redux/features/authApiSlice';
import Spinner from '@/components/common/Spinner';
// import List from '@/components/common/List';
// import {useState, useEffect} from "react";
// import getApiUrl from "@/components/api";
// import { useRouter } from 'next/navigation';
// import {toast} from "react-toastify";
// import {useState} from "react";
// import getApiUrl from "@/components/api";
import {toast} from "react-toastify";
import CompanyData from "@/components/company/getCompany";
import {Suspense} from "react";


export default async function Page() {
    return (
        <>
            <main className="mx-auto max-w-7xl py-6 my-8 sm:px-6 lg:px-8">
                <div>
                    <h1>Company</h1>
                    <Suspense fallback={<Spinner/>}>
                        <CompanyData/>
                    </Suspense>
                </div>
            </main>
        </>
    );
}