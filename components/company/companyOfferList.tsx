'use client'

import getApiUrl from "@/components/api";



async function getCompanyOfferList(){
    const token = localStorage.getItem("access");

    const response = await fetch(`${getApiUrl()}api/company/offer`, {
           headers: {
               Authorization: `Bearer ${token}`,
               accept: 'application/json',
           }
    })

    return await response.json()

}


export default async function OfferList() {
    const data = await getCompanyOfferList()

    return (
        <>
            <div>
                {data ? (
                    <div>
                        {data.map((offer: any) => (
                            <div key={offer.id}>
                                <h1>{offer.title}</h1>
                                <p>{offer.description}</p>
                            </div>
                        ))}
                    </div>

                ): (
                    <h1>You dont have any offers yet</h1>
                )}
            </div>
        </>
    )
}