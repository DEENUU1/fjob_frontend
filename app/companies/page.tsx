

import {Suspense} from "react";
import Spinner from "@/components/common/Spinner";
import Companies from "@/components/companies/getCompanies";


function Offers() {


    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="">
                <h1 className="text-center font-bold text-3xl mb-10">Companies</h1>

                <Suspense fallback={<Spinner/>}>
                    <Companies/>
                </Suspense>

            </div>
        </main>
    );
}

export default Offers;
