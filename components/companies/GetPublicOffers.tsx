import OfferCard from "@/components/offer/OfferCard";


async function getCompanyPublicOffers(companySlug: string){
    const response = await fetch(process.env.API_URL + `api/offer/offer/company/${companySlug}`, {
        next: {revalidate: 300}
    })

    return await response.json()
}


export default async function CompanyActiveOffers({companySlug}: {companySlug: string}) {
    const dataOffer = getCompanyPublicOffers(companySlug)
    const data = await dataOffer

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