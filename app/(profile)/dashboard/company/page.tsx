import NumberOfCompaniesToCreate from '@/components/profile/NumOfCompaniesToCreate';
import {Suspense} from "react";
import Loading from "@/components/loading";


export default async function UserCompanyDashboard() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <Suspense fallback={<Loading/>}>
                <NumberOfCompaniesToCreate/>
            </Suspense>
        </main>
    )
}

