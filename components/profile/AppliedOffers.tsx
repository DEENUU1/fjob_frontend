'use client'


async function getAppliedOffers(){
    const token = localStorage.getItem("access");

    const response = await fetch(process.env.API_URL + "url/candidate/candidate/user/", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.json();
}