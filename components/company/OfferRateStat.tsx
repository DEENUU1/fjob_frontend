





async function getOfferRateStats(slug: string){
    const response = await fetch(process.env.API_URL + `api/offer/offer/${slug}/rate/stat`, {
        credentials: 'include',
    })

    if (!response.ok) {
        throw new Error('Failed to fetch offer rate stats')
    }
    return await response.json()
}


export default async function RateStats({slug}: {slug: string}){
    const offerRateStats = await getOfferRateStats(slug);

    return (
        <>
            <p>
                <span>Avg: {offerRateStats.avg}</span>
                <span>Num rates: {offerRateStats.num_rates}</span>
                <span>1: {offerRateStats.one_rate}</span>
                <span>2: {offerRateStats.two_rate}</span>
                <span>3: {offerRateStats.three_rate}</span>
                <span>4: {offerRateStats.four_rate}</span>
                <span>5: {offerRateStats.five_rate}</span>
            </p>
        </>
    )
}