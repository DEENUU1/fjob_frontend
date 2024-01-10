'use client'

import React, {useState} from "react";
import {toast} from "react-toastify";
import {useRouter} from 'next/navigation';
import getCompanyCategory from "@/components/company/CompanyCategory";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import {Input} from "@nextui-org/react";
import {Select, SelectItem} from "@nextui-org/react";
import {Textarea} from "@nextui-org/react";
import {Switch} from "@nextui-org/react";

export default function EditCompanyModal({company}: { company: Company }) {
    const router = useRouter();

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
    const [category, setCategory] = useState(company.category || null)
    const categories = getCompanyCategory();
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        setIsLoading(true)

        const formData = new FormData();
        // @ts-ignore
        formData.append("company_id", 2);
        formData.append("name", name);
        // @ts-ignore
        formData.append("company_size", companySize);
        formData.append("description", description);
        // @ts-ignore
        formData.append("user", user);
        // @ts-ignore
        formData.append("addresses", addresses);
        formData.append("linkedin_url", linkedinUrl);
        formData.append("facebook_url", facebookUrl);
        formData.append("twitter_url", twitterUrl);
        formData.append("instagram_url", instagramUrl);
        formData.append("youtube_url", youtubeUrl);
        formData.append("website_url", websiteUrl);
        // @ts-ignore
        formData.append("is_active", isActive);

        if (logo !== null && typeof logo !== "string") {
            formData.append("logo", logo);
        }

        if (category !== null) {
            // @ts-ignore
            formData.append("category", category?.id);
        }

        try {
            const response = await fetch(process.env.API_URL + "api/company/management/", {
                method: "PUT",
                headers: {
                    accept: "application/json",
                    // Authorization: `Bearer ${token}`
                },
                credentials: "include",
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
        } finally {
            setIsLoading(false);
        }

    }

    // @ts-ignore
    return (
        <>

            <Button onPress={onOpen} className="mb-2">Update</Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Update company</ModalHeader>
                            <form onSubmit={handleSubmit}>
                                <ModalBody>
                                    <Input type="text" value={name} label="Name" onChange={(e) => setName(e.target.value)}/>

                                    <Select label="Category" onChange={(e) => setCategory(e.target.value)}>

                                        {categories?.map((cat) => (
                                            <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                                        ))}
                                    </Select>

                                    <Textarea label="Description" value={description} onChange={(e) => setDescription(e.target.value)}/>

                                    <label className="block mb-2 font-medium" htmlFor="logo">Logo</label>
                                    <input
                                        className="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 border-gray-600 placeholder-gray-400"
                                        id="logo"
                                        type="file"
                                        onChange={(e) => setLogo(e.target.files[0])}
                                    />


                                    <Input type="number" label="Company size" value={companySize}
                                           onChange={(e) => setCompanySize(e.target.value)}/>

                                    <Input type="url" name="linkedin" value={linkedinUrl} label="Linked in"
                                           onChange={(e) => setLinkedinUrl(e.target.value)}/>

                                    <Input type="url" value={facebookUrl} label="Facebook"
                                           onChange={(e) => setFacebookUrl(e.target.value)}/>

                                    <Input type="url" value={twitterUrl} label="Twitter"
                                           onChange={(e) => setTwitterUrl(e.target.value)}/>

                                    <Input type="url" value={instagramUrl} label="Instagram"
                                           onChange={(e) => setInstagramUrl(e.target.value)}/>

                                    <Input type="url" value={youtubeUrl} label="Youtube"
                                           onChange={(e) => setYoutubeUrl(e.target.value)}/>

                                    <Input type="url" label="Website" value={websiteUrl}
                                           onChange={(e) => setWebsiteUrl(e.target.value)}/>


                                    {isActive ? (
                                        <Switch defaultSelected color="success" onChange={(e) => setIsActive(e.target.checked)}></Switch>

                                    ): (
                                        <Switch color="success" onChange={(e) => setIsActive(e.target.checked)}></Switch>
                                    )}


                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" variant="light" onPress={onClose}>
                                        Close
                                    </Button>
                                    <Button isLoading={isLoading} type="submit" color="warning">{isLoading ? 'Loading...' : 'Update'}</Button>
                                </ModalFooter>
                            </form>

                        </>
                    )}
                </ModalContent>
            </Modal>


        </>
    )


}