import getApiUrl from "@/components/api";
import Image from "next/image";
import Link from "next/link";


async function getCompanies() {
    const response = await fetch(process.env.API_URL + "api/company", {
        next: {revalidate: 3600},
    })

    return await response.json()
}


export default async function Companies() {
    const data = await getCompanies()

    return (
        <>
            <div>
                {data ? (
                    <div className="grid grid-cols-3 gap-3">
                        {data.map((company: any) => (
                            <div key={company.name}
                                 className="max-w-sm bg-white border border-gray-200 rounded-lg shadow">
                                <Link href={`/companies/${company.id}`}>
                                    {company.logo ? (
                                        <Image className="rounded-t-lg" src="/" alt={company.name} width={500}
                                               height={500}/>
                                    ) : (
                                        <Image className="rounded-t-lg"
                                               src="https://www.eclosio.ong/wp-content/uploads/2018/08/default.png"
                                               alt="default" width={500} height={500}/>
                                    )}

                                    <div className="p-5">
                                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{company.name}</h5>
                                        <p className="mb-3 font-normal text-gray-700">{company.description.substring(0, 50) + "..."}</p>
                                    </div>
                                </Link>
                            </div>

                        ))}
                    </div>
                ) : (
                    <div>There is no companies here</div>
                )}
            </div>

        </>
    )
}