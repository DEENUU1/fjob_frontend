import {Metadata} from "next";
import CreateJobOffer from "@/components/company/CreateOffer";


export const metadata: Metadata = {
    title: 'FJob | Dashboard offers create',
}

export default async function Page() {
    return (
        <>
            <main className="mx-auto max-w-7xl py-6 my-8 sm:px-6 lg:px-8">

                <div>
                    <h1 className="text-2xl mt-5 mb-5">Create job offer</h1>
                    <CreateJobOffer/>

                </div>
            </main>
        </>
    )
}