import getApiUrl from "@/components/api";


async function getCompanies(){
    const response = await fetch(`${getApiUrl()}api/company`)

    return await response.json()
}


export default async function Companies(){
    const data = await getCompanies()

    return (
        <>
            <div>

            </div>

        </>
    )
}