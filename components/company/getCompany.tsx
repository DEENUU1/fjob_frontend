'use client'
import getApiUrl from "@/components/api";
import Image from "next/image";

async function getCompany(){
    const token = localStorage.getItem("access")

    const response = await fetch(`${getApiUrl()}api/company/company`, {
        headers: {
            accept: "application/json",
            Authorization: `Bearer ${token}`
        }
    })
    return await response.json()

}

// {'id': 1, 'name': '-155781922110444758', 'logo': None, 'company_size': '1', 'description': None, 'num_of_offers_to_add': 1, 'linkedin_url': None, 'facebook_url': None, 'twitter_
//     url': None, 'instagram_url': None, 'youtube_url': None, 'website_url': None, 'created_at': '2023-12-19T15:42:52.762735Z', 'is_active': False, 'user': 6, 'addresses': []}

export default async function CompanyData() {
    const data = await getCompany()
    console.log(data)
    return (
        <>
            <h2>{data?.name} Name</h2>
            {data.image && (
                <Image src={data?.logo} width={400} height={400} alt="logo"/>
            )}
            <p>{data?.description}</p>
            <p>{data?.company_size}</p>
            <p>{data?.linkedin_url}</p>
            <p>{data?.facebook_url}</p>
            <p>{data?.twitter_url}</p>
            <p>{data?.instagram_url}</p>
            <p>{data?.youtube_url}</p>
            <p>{data?.website_url}</p>
            <p>{data?.addresses}</p>

        </>
    )
}