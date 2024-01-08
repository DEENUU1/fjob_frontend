

async function getCandidates(offerId: number){
    const response = await fetch(process.env.API_URL + `api/candidate/candidate/offer/${offerId}`, {
        credentials: "include",
    })

    if (!response.ok){
        throw new Error("Something went wrong")
    }

    return response.json();
}

