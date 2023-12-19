import {Suspense} from "react";
import Spinner from "@/components/common/Spinner";
import CompanyDetails from "@/components/companies/companyDetails";
import CompanyActiveOffers from "@/components/companies/getPublicOffers";


export default function Page({params}) {
    const id = params.id;

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">

            <div>
                <Suspense fallback={<Spinner/>}>
                    <CompanyDetails companyId={id}/>
                </Suspense>

                <h1 className="text-2xl">Active job offers:</h1>
                <Suspense fallback={<Spinner/>}>
                    <CompanyActiveOffers companyId={id}/>
                </Suspense>

            </div>

        </main>
    )
}