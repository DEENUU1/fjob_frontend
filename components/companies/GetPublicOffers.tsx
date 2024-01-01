import OfferCard from "@/components/offer/OfferCard";


async function GetCompanyPublicOffers(companySlug: number){
    const response = await fetch(process.env.API_URL + `api/offer/offer/company/${companySlug}`)

    return await response.json()
}


// @ts-ignore
export default async function CompanyActiveOffers({companySlug}) {
    const data = await GetCompanyPublicOffers(companySlug)

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