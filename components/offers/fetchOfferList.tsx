import getApiUrl from "@/components/api";

async function getOffers() {
    // imitate delay from API
    await new Promise(resolve => setTimeout(resolve, 3000));

    const response = await fetch(`${getApiUrl()}api/offer/offer`, {
        next: {
             revalidate: 0
        }
    });

    return response.json();
}


export default async function OfferList(){
    const offers = await getOffers();
    console.log(offers)
    return (
        <>
            {offers.results.map((offer: any) => (
                <div key={offer.id}>{offer.title}</div>
            ))}
        </>
    )
}