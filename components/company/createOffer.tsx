'use client'

import React, {useState} from "react";
import getApiUrl from "@/components/api";
import {toast} from "react-toastify";
import GetExperiences from "@/components/offer/experience";
import GetWorkType from "@/components/offer/workType";
import GetEmploymentTypes from "@/components/offer/employmentType";
import { useRouter } from 'next/navigation';


// @ts-ignore
export default function CreateJobOffer() {
    const router = useRouter();

    const token = localStorage.getItem("access")
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [addresses, setAddresses] = useState(1)
    const [isRemote, setIsRemote] = useState(false)
    const [isHybrid, setIsHybrid] = useState(false)
    const [applyForm, setApplyForm] = useState("")
    const [skills, setSkills] = useState()
    const [experience, setExperience] = useState<string[]>([]);
    const [workType, setWorkType] = useState([])
    const [employmentType, setEmploymentType] = useState([])
    const [status, setStatus] = useState("")

    const experiences = GetExperiences();
    const workTypes = GetWorkType();
    const employmentTypes = GetEmploymentTypes();

    const experienceMultiSelect = () => {
        return (
            <select
                className="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
                multiple
                name="experience[]"
                onChange={(e) => setExperience(Array.from(e.target.selectedOptions, (option) => option.value))}
            >
                {experiences && experiences.map((experience: any) => (
                    <option key={experience.id} value={experience.id}>
                        {experience.name}
                    </option>
                ))}
            </select>
    );
    };

    const workTypeMultiSelect = () => {
        return (
            <select className="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required multiple name="experience[]" onChange={(e) => setWorkType(e.target.value)}>
                {workTypes && workTypes.map((workType:any) => (
                    <option key={workType.id} value={workType.id}>{workType.name}</option>
                ))}
            </select>
        );
    };

    const employmentTypeMultiSelect = () => {
        return (
            <select className="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required multiple name="experience[]" onChange={(e) => setEmploymentType(e.target.value)}>
                {employmentTypes && employmentTypes.map((employmentType: any) => (
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
            const response = await fetch(`${getApiUrl()}api/offer/company/`, {
                method: "POST",
                headers: {
                    accept: "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: formData,
            });
            if (response.ok) {
                toast.success("Offer created successfully")
                router.push('/company/offer')
            } else {
                toast.error("Offer creation failed")
            }
        } catch (error) {
            toast.error("Offer creation failed")
        }

    }

    return (
        <>
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
                        <input value={isRemote} onChange={() => setIsRemote(!isRemote)} id="link-checkbox" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                        <label htmlFor="link-checkbox" className="ms-2 text-sm font-medium">Is remote</label>
                    </div>

                    <div className="flex items-center">
                        <input value={isHybrid} onChange={() => setIsHybrid(!isHybrid)} id="link-checkbox" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                        <label htmlFor="link-checkbox" className="ms-2 text-sm font-medium">Is hybrid</label>
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

                <label htmlFor="experience" className="block mb-2 font-medium">Employment Type</label>
                {workTypeMultiSelect()}

                <label htmlFor="experience" className="block mb-2 font-medium">Work Type</label>
                {employmentTypeMultiSelect()}

                <label htmlFor="status" className="block mb-2 font-medium">Status</label>
                <select className="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" name="status" onChange={(e) => setStatus(e.target.value)}>
                    <option value="DRAFT">Draft</option>
                    <option value="ACTIVE">Published</option>
                </select>


                <button type="submit" className=" mt-2 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Create</button>
            </form>
        </>
    )


}