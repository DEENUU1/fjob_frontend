import getApiUrl from "@/components/api";


export async function getOffer(id: number) {
    const response = await fetch(`${getApiUrl()}/api/offer/offer/${id}`, {
        next: {
            revalidate: 0
        }
    });

    return response.json();
}