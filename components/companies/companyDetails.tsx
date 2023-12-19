'use client'
import getApiUrl from "@/components/api";
import Image from "next/image";
import Link from "next/link";
import { SocialIcon } from 'react-social-icons'

async function getCompanyDetails(companyId: number){

    const response = await fetch(`${getApiUrl()}api/company/${companyId}`, {
        headers: {
            accept: "application/json",
        }
    })
    return await response.json()

}


export default async function CompanyDetails({companyId}) {
    const data = await getCompanyDetails(companyId)

    return (
        <>
            <div className="space-x-2 mb-5">
                {data.linkedin_url && (
                    <SocialIcon url={data?.linkedin_url}/>
                )}
                {data.facebook_url && (
                    <SocialIcon url={data?.facebook_url}/>
                )}
                {data.twitter_url && (
                    <SocialIcon url={data?.twitter_url}/>
                )}
                {data.instagram_url && (
                    <SocialIcon url={data?.instagram_url}/>
                )}
                {data.youtube_url && (
                    <SocialIcon url={data?.youtube_url}/>
                )}
                {data.website_url && (
                    <SocialIcon url={data?.website_url}/>
                )}
            </div>

            <h2 className="text-4xl">{data?.name} </h2>


            {/*{data.image && (*/}
            {/*    <Image src={data?.logo} width={400} height={400} alt="logo"/>*/}
            {/*)}*/}
            <p className="text-xl mt-2 mb-2">Company size: {data?.company_size}</p>

            <h3 className="text-xl mt-2">Addresses:</h3>
            <div>
                {data.addresses && (
                    <div className="mb-2">
                        {data.addresses.map((address: any) => (
                            <p key={address.id}>
                                - {address.country.name} {address.city.name} {address.region.name} {address.street}
                            </p>
                        ))}
                    </div>
                )}
            </div>

            <h3 className="text-xl">Description:</h3>

            <p className="text-gray-800 mb-2">{data?.description}</p>

        </>
    )
}