import Spinner from '@/components/common/Spinner';
import CompanyData from "@/components/company/getCompany";
import {Suspense} from "react";
import {Metadata} from "next";


export const metadata: Metadata = {
    title: 'FJob | Dashboard',
}

export default async function Page() {
    return (
        <>
            <main className="mx-auto max-w-7xl py-6 my-8 sm:px-6 lg:px-8">
                <div>
                    {/*<Suspense fallback={<Spinner/>}>*/}
                        <CompanyData/>
                    {/*</Suspense>*/}
                </div>
            </main>
        </>
    );
}