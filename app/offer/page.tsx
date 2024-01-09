import OfferList from "@/components/offer/OfferList";
import {Search, Remote, Hybrid, Sort, WorkType, Experience, Employment} from "@/components/offer/Search";
import {Suspense} from "react";
import Spinner from "@/components/common/Spinner";


export default async function Page(
    {
        searchParams
    }:{
        searchParams?:
            {
                query?: string;
                is_remote: string;
                is_hybrid: string;
                ordering: string;
                work_type: string;
                experience: string;
                employment_type: string
            }
    })
    {
    const query = searchParams?.query || '';
    const isRemote = searchParams?.is_remote || '';
    const isHybrid = searchParams?.is_hybrid || '';
    const ordering = searchParams?.ordering || '-created_at';
    const workType = searchParams?.work_type || '';
    const experience = searchParams?.experience || '';
    const employment = searchParams?.employment_type || '';

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div>
                <h1 className="text-center font-bold text-3xl mb-10">Job offers list</h1>

                <Suspense fallback={<Spinner/>}>
                    <div className="lg:flex lg:space-x-4 lg:items-center lg:mb-4">
                        <div className="lg:w-2/4 mb-4 lg:mb-0">
                            <Search/>
                        </div>
                        <div className="lg:w-2/4 mb-4 lg:mb-0">
                            <Sort/>
                        </div>
                        <div className="lg:w-1/4 mb-4">
                            <Remote/>
                        </div>
                        <div className="lg:w-1/4 mb-4">
                            <Hybrid/>
                        </div>
                    </div>
                    <div className="lg:flex lg:space-x-4 lg:items-center">
                        <WorkType/>
                        <Experience/>
                        <Employment/>
                    </div>
                </Suspense>

                <Suspense fallback={<Spinner/>}>
                    <OfferList
                        query={query}
                        isRemote={isRemote}
                        isHybrid={isHybrid}
                        ordering={ordering}
                        workType={workType}
                        experienceType={experience}
                        employmentType={employment}
                    />
                </Suspense>
            </div>
        </main>
    );
}
