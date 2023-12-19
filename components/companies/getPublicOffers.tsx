import getApiUrl from "@/components/api";
import OfferCard from "@/components/offer/offerCard";


async function getCompanyPublicOffers(companyId: number){
    const response = await fetch(`${getApiUrl()}api/offer/offer/company/${companyId}`)

    return await response.json()
}


export default async function CompanyActiveOffers({companyId}) {
    const data = await getCompanyPublicOffers(companyId)

    return (
        <>
            {data ? (
                data.map((offer) => (
                    <OfferCard key={offer.id} offer={offer} />
                ))
            ) : (
                <div>No offers</div>
            )}
        </>
    )
}