'use client'

import getApiUrl from "@/components/api";


export async function getNumberOfCompaniesToCreate() {
    const token = localStorage.getItem('access');

    const response = await fetch(`${getApiUrl()}api/user/num_of_available_companies`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })

    return response.json()
}


export default async function NumberOfCompaniesToCreate() {
    const data = await getNumberOfCompaniesToCreate();
    console.log(data)
    return (
        <div>
            {/*<span>{data.num_of_available_companies}</span>*/}
            <h1>Dupa</h1>
        </div>

    )

}