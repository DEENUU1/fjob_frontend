import getApiUrl from "@/components/api";


async function getOffer(id: number) {
    const response = await fetch(`${getApiUrl()}/api/offer/offer/${id}`, {
        next: {
            revalidate: 0
        }
    });

    return response.json();
}


export default async function Offer(id: number){
    const offer = await getOffer(id);

    return (
        <>
            <div
                className="border-2 border-3-black hover:border-black hover:border-3 rounded-2xl container mb-4 mt-4"
            >

                <h1>{offer.title}</h1>

            </div>


        </>
    )
}