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

async function canCreateCompany(data: any){
    return data.num_of_available_companies !== 0;
}


export default async function NumberOfCompaniesToCreate() {
    const data = await getNumberOfCompaniesToCreate();
    const userCanCreateCompany = await canCreateCompany(data);

    return (
        <div>
            {userCanCreateCompany ? (
              <h3>You can create <strong>{data.num_of_available_companies}</strong> companies</h3>
            ): (
                <>
                    <h3>You are not able to create new company</h3>
                    <p>Check our
                        <a href="/"> price-list </a>
                        to get more information
                    </p>
                </>
            )}


        </div>

    )

}