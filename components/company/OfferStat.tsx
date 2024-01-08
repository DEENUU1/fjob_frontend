





export default async function getOfferRateStats(slug: string){
    const response = await fetch(process.env.API_URL + `api/offer/offer/${slug}/rate/stat`, {
        credentials: 'include',
    })

    if (!response.ok) {
        throw new Error('Failed to fetch offer rate stats')
    }
    return await response.json()
}

