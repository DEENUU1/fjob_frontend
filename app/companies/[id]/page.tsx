import {Suspense} from "react";
import Spinner from "@/components/common/Spinner";
import CompanyDetails from "@/components/companies/companyDetails";


export default function Page({params}) {
    const id = params.id;

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">

            <div>
                <Suspense fallback={<Spinner/>}>
                    <CompanyDetails companyId={id}/>
                </Suspense>
            </div>

        </main>
    )
}