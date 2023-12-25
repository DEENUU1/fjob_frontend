'use client'

import React, {useState} from "react";
import getApiUrl from "@/components/api";
import {toast} from "react-toastify";
import GetExperiences from "@/components/offer/experience";
import GetWorkType from "@/components/offer/workType";
import GetEmploymentTypes from "@/components/offer/employmentType";
import {useRouter} from 'next/navigation';
import {FaFlag} from "react-icons/fa";
import {RiEditFill, RiEditLine} from "react-icons/ri";


// @ts-ignore
export default function EditOfferModal({offer}) {
    const [showModal, setShowModal] = useState(false);
    const router = useRouter();

    const token = localStorage.getItem("access")
    const [title, setTitle] = useState(offer.title || "")
    const [description, setDescription] = useState(offer.description || "")
    const [addresses, setAddresses] = useState(1)
    const [isRemote, setIsRemote] = useState(offer.is_remote || false)
    const [isHybrid, setIsHybrid] = useState(offer.is_hybrid || false)
    const [applyForm, setApplyForm] = useState(offer.apply_form || "")
    const [skills, setSkills] = useState(offer.skills || "")
    const [experience, setExperience] = useState(offer.experience || [])
    const [workType, setWorkType] = useState(offer.work_type || [])
    const [employmentType, setEmploymentType] = useState(offer.employment_type || [])
    const [status, setStatus] = useState(offer.status || "")

    const [isHover, setIsHover] = useState(false);
    const onMouseEnter = () => setIsHover(true);
    const onMouseLeave = () => setIsHover(false);


    const experiences = GetExperiences();
    const workTypes = GetWorkType();
    const employmentTypes = GetEmploymentTypes();


    const experienceMultiSelect = () => {
        return (
            <select className="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    required multiple name="experience[]" onChange={(e) => setExperience(e.target.value)}>
                {experiences && experiences.length > 0 && experiences.map((experience: any) => (
                    <option key={experience.id} value={experience.id}>{experience.name}</option>
                ))}
            </select>
        );
    };

    const workTypeMultiSelect = () => {
        return (
            <select className="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    required multiple name="experience[]" onChange={(e) => setWorkType(e.target.value)}>
                {workTypes && workTypes.length > 0 && workTypes.map((workType: any) => (
                    <option key={workType.id} value={workType.id}>{workType.name}</option>
                ))}
            </select>
        );
    };

    const employmentTypeMultiSelect = () => {
        return (
            <select className="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    required multiple name="experience[]" onChange={(e) => setEmploymentType(e.target.value)}>
                {employmentTypes && employmentTypes.length > 0 && employmentTypes.map((employmentType: any) => (
                    <option key={employmentType.id} value={employmentType.id}>{employmentType.name}</option>
                ))}
            </select>
        );
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        // @ts-ignore
        formData.append("addresses", addresses);
        // @ts-ignore
        formData.append("is_remote", isRemote);
        // @ts-ignore
        formData.append("is_hybrid", isHybrid);
        formData.append("apply_form", applyForm);
        // @ts-ignore
        formData.append("skills", skills);
        // @ts-ignore
        formData.append("experience", experience);
        // @ts-ignore
        formData.append("work_type", workType);
        // @ts-ignore
        formData.append("employment_type", employmentType);
        formData.append("status", status);
        // @ts-ignore
        formData.append("company_id", 2);
        // @ts-ignore
        formData.append("company", 2);

        try {
            const response = await fetch(process.env.API_URL + "api/offer/company/${offer.id}/", {
                method: "PUT",
                headers: {
                    accept: "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: formData,
            });
            if (response.ok) {
                toast.success("Offer updated successfully")
                router.push('/company/offer')
            } else {
                toast.error("Offer update failed")
            }
        } catch (error) {
            toast.error("Offer update failed")
        }

    }

    return (
        <>
            <button className="cursor-pointer ml-auto text-xl" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} type="button" onClick={() => setShowModal(true)}>
                {isHover ? (
                    <RiEditFill  />
                ): (
                    <RiEditLine />

                )}
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
                                    Edit Job Offer
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


                                    <label htmlFor="title" className="block mb-2 font-medium">Title</label>
                                    <input type="text" placeholder="title" required autoComplete="false"
                                           name="title"
                                           value={title}
                                           onChange={(e) => setTitle(e.target.value)}
                                           className="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 border-gray-600 placeholder-gray-400"
                                    />
                                    <label htmlFor="description" className="block mb-2 font-medium">Description</label>
                                    <textarea placeholder="description" name="description" required autoComplete="false"
                                              value={description}
                                              onChange={(e) => setDescription(e.target.value)}
                                              className="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 border-gray-600 placeholder-gray-400"
                                    />

                                    <div className="grid gap-6 mb-6 md:grid-cols-2 mt-2">
                                        <div className="flex items-center">
                                            <input value={isRemote} onChange={() => setIsRemote(!isRemote)}
                                                   id="link-checkbox" type="checkbox"
                                                   className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                            <label htmlFor="link-checkbox" className="ms-2 text-sm font-medium">Is
                                                remote</label>
                                        </div>

                                        <div className="flex items-center">
                                            <input value={isHybrid} onChange={() => setIsHybrid(!isHybrid)}
                                                   id="link-checkbox" type="checkbox"
                                                   className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                            <label htmlFor="link-checkbox" className="ms-2 text-sm font-medium">Is
                                                hybrid</label>
                                        </div>
                                    </div>

                                    <label htmlFor="apply_form" className="block mb-2 font-medium">Apply form</label>
                                    <input type="text" placeholder="apply form" name="apply_form" autoComplete="false"
                                           className="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 border-gray-600 placeholder-gray-400"
                                    />

                                    <label htmlFor="skills" className="block mb-2 font-medium">Skills</label>
                                    <input type="text" placeholder="skills" name="skills" autoComplete="false"
                                           className="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 border-gray-600 placeholder-gray-400"
                                    />

                                    <label htmlFor="experience" className="block mb-2 font-medium">Experience</label>
                                    {experienceMultiSelect()}

                                    <label htmlFor="experience" className="block mb-2 font-medium">Employment
                                        Type</label>
                                    {workTypeMultiSelect()}

                                    <label htmlFor="experience" className="block mb-2 font-medium">Work Type</label>
                                    {employmentTypeMultiSelect()}

                                    <label htmlFor="status" className="block mb-2 font-medium">Status</label>
                                    <select
                                        className="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        name="status" onChange={(e) => setStatus(e.target.value)}>
                                        <option value="DRAFT">Draft</option>
                                        <option value="ACTIVE">Published</option>
                                    </select>


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