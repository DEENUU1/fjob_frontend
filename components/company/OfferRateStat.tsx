





async function getOfferRateStats(slug: string){
    const response = await fetch(process.env.API_URL + `api/offer/offer/${slug}/rate/stat`, {
        credentials: 'include',
    })

    if (!response.ok) {
        throw new Error('Failed to fetch offer rate stats')
    }
    return await response.json()
}


function getPercentValue(value: number, sum: number) {
    return (value / sum) * 100;
}

export default async function RateStats({slug}: {slug: string}){
    const offerRateStats = await getOfferRateStats(slug);

    const fiveRateBar = getPercentValue(offerRateStats.five_rate, offerRateStats.num_rates);
    const fourRateBar = getPercentValue(offerRateStats.four_rate, offerRateStats.num_rates);
    const threeRateBar = getPercentValue(offerRateStats.three_rate, offerRateStats.num_rates);
    const twoRateBar = getPercentValue(offerRateStats.two_rate, offerRateStats.num_rates);
    const oneRateBar = getPercentValue(offerRateStats.one_rate, offerRateStats.num_rates);

    return (
        <>
            <div className="max-w-full mx-4 py-6 sm:mx-auto sm:px-6 lg:px-8">
                <div className="sm:flex sm:space-x-4">
                    <div
                        className="inline-block hover:shadow-xl align-bottom bg-white rounded-lg text-left overflow-hidden shadow transform transition-all mb-4 w-full sm:w-1/3 sm:my-8">
                        <div className="bg-white p-5">
                            <div className="sm:flex sm:items-start">
                                <div className="text-center sm:mt-0 sm:ml-2 sm:text-left">
                                    <h3 className="text-sm leading-6 font-medium text-gray-900">Average rate</h3>
                                    <p className="text-3xl font-bold text-black">{offerRateStats.avg} / 5</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        className="inline-block hover:shadow-xl align-bottom bg-white rounded-lg text-left overflow-hidden shadow transform transition-all mb-4 w-full sm:w-1/3 sm:my-8">
                        <div className="bg-white p-5">
                            <div className="sm:flex sm:items-start">
                                <div className="text-center sm:mt-0 sm:ml-2 sm:text-left">
                                    <h3 className="text-sm leading-6 font-medium text-gray-900">Total rates</h3>
                                    <p className="text-3xl font-bold text-black">{offerRateStats.num_rates}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <div className="flex items-center">
                    <span className="text-sm font-medium dark:text-blue-500">5
                        star</span>
                    <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                        <div className={`h-5 bg-yellow-300 rounded`} style={{"width": `${fiveRateBar}%`}}></div>
                    </div>
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{fiveRateBar} %</span>
                </div>
                <div className="flex items-center mt-4">
                    <span className="text-sm font-medium dark:text-blue-500">4
                        star</span>
                    <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                        <div className="h-5 bg-yellow-300 rounded" style={{"width": `${fourRateBar}%`}}></div>
                    </div>
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{fourRateBar} %</span>
                </div>
                <div className="flex items-center mt-4">
                    <span className="text-sm font-medium dark:text-blue-500">3
                        star</span>
                    <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                        <div className="h-5 bg-yellow-300 rounded" style={{"width": `${threeRateBar}%`}}></div>
                    </div>
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{threeRateBar} %</span>
                </div>
                <div className="flex items-center mt-4">
                    <span className="text-sm font-medium dark:text-blue-500">2
                        star</span>
                    <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                        <div className="h-5 bg-yellow-300 rounded" style={{"width": `${twoRateBar}%`}}></div>
                    </div>
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{twoRateBar} %</span>
                </div>
                <div className="flex items-center mt-4">
                    <span className="text-sm font-medium dark:text-blue-500">1
                        star</span>
                    <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                        <div className="h-5 bg-yellow-300 rounded" style={{"width": `${oneRateBar}%`}}></div>
                    </div>
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{oneRateBar} %</span>
                </div>
            </div>
        </>
    )
}