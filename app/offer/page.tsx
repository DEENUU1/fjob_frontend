import OfferList from "@/components/offer/OfferList";
import {Search, Remote, Hybrid, Sort, WorkType, Experience, Employment} from "@/components/offer/Search";


export default async function Page({searchParams}: {searchParams?: {query?: string; is_remote: string; is_hybrid: string, ordering: string, work_type: string, experience: string, employment_type: string}}) {
    const query = searchParams?.query || '';
    const isRemote = searchParams?.is_remote || '';
    const isHybrid = searchParams?.is_hybrid || '';
    const ordering = searchParams?.ordering || '';
    const workType = searchParams?.work_type || '';
    const experience = searchParams?.experience || '';
    const employment = searchParams?.employment_type || '';

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div>
                <h1 className="text-center font-bold text-3xl mb-10">Job offers list</h1>

                <Search/>
                <Remote/>
                <Hybrid/>
                <Sort/>
                <WorkType/>
                <Experience/>
                <Employment/>

                <OfferList
                    query={query}
                    isRemote={isRemote}
                    isHybrid={isHybrid}
                    ordering={ordering}
                    workType={workType}
                    experienceType={experience}
                    employmentType={employment}
                />



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
