import OfferCard from "@/components/offer/OfferCard";


async function getCompanyPublicOffers(companySlug: string){
    const response = await fetch(process.env.API_URL + `api/offer/offer/company/${companySlug}`)

    return await response.json()
}


export default async function CompanyActiveOffers({companySlug}: {companySlug: string}) {
    const dataOffer = getCompanyPublicOffers(companySlug)
    const data = await dataOffer

    return (
        <>
            <h3 className="text-2xl">Active job offers:</h3>

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