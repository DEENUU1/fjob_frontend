import {Suspense} from "react";
import Spinner from "@/components/common/Spinner";
import CompanyDetails from "@/components/companies/CompanyDetails";
import CompanyActiveOffers from "@/components/companies/GetPublicOffers";
import {Metadata} from "next";

interface PageParams {
    slug: string;
}

export const metadata: Metadata = {
    title: 'FJob | Company details',
}

export default function Page({ params }: { params: PageParams }) {
    const slug = params.slug;

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">

            <div>
                <Suspense fallback={<Spinner/>}>
                    <CompanyDetails companySlug={slug}/>
                </Suspense>

                <h1 className="text-2xl">Active job offers:</h1>
                <Suspense fallback={<Spinner/>}>
                    <CompanyActiveOffers companySlug={slug}/>
                </Suspense>
`
            </div>

        </main>
    )
}