'use client'

import React, {useState} from "react";
// @ts-ignore
import getApiUrl from "@/components/api";
import {toast} from "react-toastify";
import {useRouter} from 'next/navigation';
import {FaFlag} from "react-icons/fa";

// name = models.CharField(max_length=255)
// logo = models.FileField
// company_size = models.CharField(max_length=255, default=1)
// description = models.TextField(null=True, blank=True)
// user = models.ForeignKey(UserAccount, on_delete=models.CASCADE)
// addresses = models.ManyToManyField(Address, blank=True)
// num_of_offers_to_add = models.IntegerField(default=1)
// linkedin_url = models.URLField(null=True, blank=True)
// facebook_url = models.URLField(null=True, blank=True)
// twitter_url = models.URLField(null=True, blank=True)
// instagram_url = models.URLField(null=True, blank=True)
// youtube_url = models.URLField(null=True, blank=True)
// website_url = models.URLField(null=True, blank=True)
// created_at = models.DateTimeField(auto_now_add=True)
// is_active = models.BooleanField(default=False)

export default function EditCompanyModal({company}) {
    const [showModal, setShowModal] = useState(false);
    const router = useRouter();
    const token = localStorage.getItem("access")

    const [name, setName] = useState(company.name || "")
    const [logo, setLogo] = useState(company.logo || "")
    const [companySize, setCompanySize] = useState(company.company_size || "")
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
        formData.append("num_of_offers_to_add", numOfOffersToAdd);
        formData.append("linkedin_url", linkedinUrl);
        formData.append("facebook_url", facebookUrl);
        formData.append("twitter_url", twitterUrl);
        formData.append("instagram_url", instagramUrl);
        formData.append("youtube_url", youtubeUrl);
        formData.append("website_url", websiteUrl);
        formData.append("is_active", isActive);

        try {
            const response = await fetch(`${getApiUrl()}api/company/management/`, {
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

    return (
        <>
            <button
                className="ease-linear transition-all duration-150"
                type="button"
                onClick={() => setShowModal(true)}
            >
                <FaFlag/>
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


                                    {/*<label htmlFor="title" className="block mb-2 font-medium">Title</label>*/}
                                    {/*<input type="text" placeholder="title" required autoComplete="false"*/}
                                    {/*       name="title"*/}
                                    {/*       value={title}*/}
                                    {/*       onChange={(e) => setTitle(e.target.value)}*/}
                                    {/*       className="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 border-gray-600 placeholder-gray-400"*/}
                                    {/*/>*/}


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