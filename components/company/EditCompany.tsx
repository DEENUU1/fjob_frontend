'use client'

import React, {useState} from "react";
// @ts-ignore
import {toast} from "react-toastify";
import {useRouter} from 'next/navigation';


// @ts-ignore
export default function EditCompanyModal({company}) {
    const [showModal, setShowModal] = useState(false);
    const router = useRouter();
    const token = localStorage.getItem("access")

    const [name, setName] = useState(company.name || "")
    const [logo, setLogo] = useState(company.logo || null)
    const [companySize, setCompanySize] = useState(company.company_size || 0)
    const [description, setDescription] = useState(company.description || "")
    const [user, setUser] = useState(company.user || "")
    const [addresses, setAddresses] = useState(company.addresses || [1])
    const [linkedinUrl, setLinkedinUrl] = useState(company.linkedin_url || "")
    const [facebookUrl, setFacebookUrl] = useState(company.facebook_url || "")
    const [twitterUrl, setTwitterUrl] = useState(company.twitter_url || "")
    const [instagramUrl, setInstagramUrl] = useState(company.instagram_url || "")
    const [youtubeUrl, setYoutubeUrl] = useState(company.youtube_url || "")
    const [websiteUrl, setWebsiteUrl] = useState(company.website_url || "")
    const [isActive, setIsActive] = useState(company.is_active || false)

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const formData = new FormData();
        // @ts-ignore
        formData.append("company_id", 2);
        formData.append("name", name);
        formData.append("logo", logo);
        formData.append("company_size", companySize);
        formData.append("description", description);
        formData.append("user", user);
        formData.append("addresses", addresses);
        // formData.append("num_of_offers_to_add", numOfOffersToAdd);
        formData.append("linkedin_url", linkedinUrl);
        formData.append("facebook_url", facebookUrl);
        formData.append("twitter_url", twitterUrl);
        formData.append("instagram_url", instagramUrl);
        formData.append("youtube_url", youtubeUrl);
        formData.append("website_url", websiteUrl);
        formData.append("is_active", isActive);

        try {
            const response = await fetch(process.env.API_URL + "api/company/management/", {
                method: "PUT",
                headers: {
                    accept: "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: formData,
            });
            if (response.ok) {
                toast.success("Company updated successfully")
                router.push('/company')
            } else {
                toast.error("Company update failed")
            }
        } catch (error) {
            toast.error("Company update failed")
        }

    }

    // @ts-ignore
    return (
        <>
            <button
                className="border-2 border-black bg-gray-200 text-black font-bold py-1 px-4 mb-2 hover:bg-gray-400 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setShowModal(true)}
            >
                <span>Edit</span>
            </button>

            {showModal ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="bg-gray-300 relative w-auto my-6 mx-auto max-w-3xl">

                            <div
                                className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                                <h3 className="text-3xl font-semibold">
                                    Edit
                                </h3>
                                <button
                                    className="p-1 ml-auto  border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                    onClick={() => setShowModal(false)}
                                >
                            <span className=" text-black  h-6 w-6 text-2xl block outline-none focus:outline-none">
                              ×
                            </span>
                                </button>
                            </div>

                            <div className="relative p-6 flex-auto">
                                <form onSubmit={handleSubmit}>


                                    <label htmlFor="title" className="block mb-2 font-medium">Name</label>
                                    <input type="text" placeholder="title" autoComplete="false"
                                           name="title"
                                           value={name}
                                           onChange={(e) => setName(e.target.value)}
                                           className="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 border-gray-600 placeholder-gray-400"
                                    />

                                    <label htmlFor="description" className="block mb-2 font-medium">Description</label>
                                    <textarea placeholder="description" autoComplete="false"
                                           name="description"
                                           value={description}
                                           onChange={(e) => setDescription(e.target.value)}
                                           className="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 border-gray-600 placeholder-gray-400"
                                    />

                                    <label className="block mb-2 font-medium" htmlFor="logo">Logo</label>
                                    <input
                                        className="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 border-gray-600 placeholder-gray-400"
                                        id="logo"
                                        type="file"
                                        onChange={(e) => setLogo(e.target.files[0])}
                                    />


                                    <label htmlFor="company_size" className="block mb-2 font-medium">Company Size</label>
                                    <input type="number" placeholder="company size" autoComplete="false"
                                           name="company_size"
                                           value={companySize}
                                           onChange={(e) => setCompanySize(e.target.value)}
                                           className="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 border-gray-600 placeholder-gray-400"
                                    />

                                    <label htmlFor="linkedin" className="block mb-2 font-medium">LinkedIn</label>
                                    <input type="url" placeholder="linkedin.com" autoComplete="false"
                                           name="linkedin"
                                           value={linkedinUrl}
                                           onChange={(e) => setLinkedinUrl(e.target.value)}
                                           className="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 border-gray-600 placeholder-gray-400"
                                    />

                                    <label htmlFor="facebook" className="block mb-2 font-medium">Facebook</label>
                                    <input type="url" placeholder="facebook.com" autoComplete="false"
                                           name="facebook"
                                           value={facebookUrl}
                                           onChange={(e) => setFacebookUrl(e.target.value)}
                                           className="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 border-gray-600 placeholder-gray-400"
                                    />

                                    <label htmlFor="twitter" className="block mb-2 font-medium">Twitter</label>
                                    <input type="url" placeholder="twitter.com" autoComplete="false"
                                           name="twitter"
                                           value={twitterUrl}
                                           onChange={(e) => setTwitterUrl(e.target.value)}
                                           className="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 border-gray-600 placeholder-gray-400"
                                    />

                                    <label htmlFor="instagram" className="block mb-2 font-medium">Instagram</label>
                                    <input type="url" placeholder="instagram.com" autoComplete="false"
                                           name="instagram"
                                           value={instagramUrl}
                                           onChange={(e) => setInstagramUrl(e.target.value)}
                                           className="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 border-gray-600 placeholder-gray-400"
                                    />

                                    <label htmlFor="youtube" className="block mb-2 font-medium">Youtube</label>
                                    <input type="url" placeholder="youtube.com" autoComplete="false"
                                           name="youtube"
                                           value={youtubeUrl}
                                           onChange={(e) => setYoutubeUrl(e.target.value)}
                                           className="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 border-gray-600 placeholder-gray-400"
                                    />

                                    <label htmlFor="website" className="block mb-2 font-medium">Website</label>
                                    <input type="url" placeholder="website.com" autoComplete="false"
                                           name="website"
                                           value={websiteUrl}
                                           onChange={(e) => setWebsiteUrl(e.target.value)}
                                           className="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 border-gray-600 placeholder-gray-400"
                                    />

                                    <input className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                           type="checkbox"
                                           name="is_active"
                                           value={isActive}
                                           onChange={(e) => setIsActive(e.target.checked)}
                                    />
                                    <label htmlFor="website" className="ms-2 text-sm font-medium">Is active</label>

                                    <div>
                                        <button type="submit"
                                                className=" mt-2 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Update
                                        </button>
                                        <button
                                            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="button"
                                            onClick={() => setShowModal(false)}
                                        >
                                            Close
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </>
            ) : null
            }


        </>
    )


}