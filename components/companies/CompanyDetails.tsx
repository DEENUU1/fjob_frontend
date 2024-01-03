import { SocialIcon } from 'react-social-icons'

async function GetCompanyDetails(companySlug: string){

    const response = await fetch(process.env.API_URL + `api/company/${companySlug}`, {
        next: {revalidate: 300} // 5 minutes cache
    })
    return await response.json()

}


// @ts-ignore
export default async function CompanyDetails({ companySlug }) {
    const data = await GetCompanyDetails(companySlug)

    return (
        <>
            <div className="max-w-7xl mx-auto">
                <div className="space-x-2 mb-5">
                    {data.linkedin_url && (
                        <SocialIcon url={data?.linkedin_url} />
                    )}
                    {data.facebook_url && (
                        <SocialIcon url={data?.facebook_url} />
                    )}
                    {data.twitter_url && (
                        <SocialIcon url={data?.twitter_url} />
                    )}
                    {data.instagram_url && (
                        <SocialIcon url={data?.instagram_url} />
                    )}
                    {data.youtube_url && (
                        <SocialIcon url={data?.youtube_url} />
                    )}
                    {data.website_url && (
                        <SocialIcon url={data?.website_url} />
                    )}
                </div>

                <h2 className="text-4xl">{data?.name}</h2>

                {/* Display logo only if it exists */}
                {data.logo && (
                    <img src={data?.logo} alt="logo" className="mb-5" />
                )}

                <p className="text-xl mt-2 mb-2">Company size: {data?.company_size}</p>

                <h3 className="text-xl mt-2">Addresses:</h3>
                <div className="flex flex-wrap mt-2">
                    {data.addresses.map((address) => (
                        <div key={address.id} className="w-full p-4 mb-2">
                            <p className="text-gray-800 mb-2">{address.country?.name ?? ''}</p>
                            <p className="text-gray-800 mb-2">{address.city?.name ?? ''}</p>
                            <p className="text-gray-800 mb-2">{address.region?.name ?? ''}</p>
                            <p className="text-gray-800">{address.street ?? ''}</p>
                        </div>
                    ))}
                </div>

                <h3 className="text-xl">Description:</h3>
                <p className="text-gray-800 mb-2">{data?.description}</p>
            </div>
        </>
    )
}