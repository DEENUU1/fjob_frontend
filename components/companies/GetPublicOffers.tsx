import OfferCard from "@/components/offer/OfferCard";


async function GetCompanyPublicOffers(companyId: number){
    const response = await fetch(process.env.API_URL + `api/offer/offer/company/${companyId}`)

    return await response.json()
}


// @ts-ignore
export default async function CompanyActiveOffers({companyId}) {
    const data = await GetCompanyPublicOffers(companyId)

    return (
        <>
            {data ? (
                data.map((offer: { id: any; }) => (
                    <OfferCard key={offer.id} offer={offer} />
                ))
            ) : (
                <div>No offers</div>
            )}
        </>
    )
}