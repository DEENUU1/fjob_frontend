'use client'

import React, {useState} from "react";
import getApiUrl from "@/components/api";
import {toast} from "react-toastify";
import getExperiences from "@/components/offer/experience";
import getWorkType from "@/components/offer/workType";
import getEmploymentTypes from "@/components/offer/employmentType";


export default function CreateJobOffer() {
    const token = localStorage.getItem("access")
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [addresses, setAddresses] = useState(1)
    const [isRemote, setIsRemote] = useState(false)
    const [isHybrid, setIsHybrid] = useState(false)
    const [applyForm, setApplyForm] = useState("")
    const [skills, setSkills] = useState()
    const [experience, setExperience] = useState([])
    const [workType, setWorkType] = useState([])
    const [employmentType, setEmploymentType] = useState([])
    const [status, setStatus] = useState("")

    const experiences = getExperiences();
    const workTypes = getWorkType();
    const employmentTypes = getEmploymentTypes();

    const experienceMultiSelect = () => {
        return (
            <select multiple name="experience[]" onChange={(e) => setExperience(e.target.value)}>
                {experiences && experiences.length > 0 && experiences.map((experience:any) => (
                    <option key={experience.id} value={experience.id}>{experience.name}</option>
                ))}
            </select>
        );
    };

    const workTypeMultiSelect = () => {
        return (
            <select multiple name="experience[]" onChange={(e) => setWorkType(e.target.value)}>
                {workTypes && workTypes.length > 0 && workTypes.map((workType:any) => (
                    <option key={workType.id} value={workType.id}>{workType.name}</option>
                ))}
            </select>
        );
    };

    const employmentTypeMultiSelect = () => {
        return (
            <select multiple name="experience[]" onChange={(e) => setEmploymentType(e.target.value)}>
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
            } else {
                toast.error("Offer creation failed")
            }
        } catch (error) {
            toast.error("Offer creation failed")
        }

    }

    return (
        <>
            <div>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="title">Title</label>
                    <input type="text" placeholder="title" required autoComplete="false"
                           name="title"
                           value={title}
                           onChange={(e) => setTitle(e.target.value)}/>

                    <label htmlFor="description">Description</label>
                    <textarea placeholder="description" name="description" required autoComplete="false"
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}/>

                    <label htmlFor="is_remote">Is remote</label>
                    <input type="checkbox" name="is_remote" value={isRemote} onChange={() => setIsRemote(!isRemote)}/>

                    <label htmlFor="is_hybrid">Is hybrid</label>
                    <input type="checkbox" name="is_hybrid" value={isHybrid} onChange={() => setIsHybrid(!isHybrid)}/>

                    <label htmlFor="apply_form">Apply form</label>
                    <input type="text" placeholder="apply form" name="apply_form" autoComplete="false"/>

                    <label htmlFor="skills">Skills</label>
                    <input type="text" placeholder="skills" name="skills" autoComplete="false"/>

                    <label htmlFor="experience">Experience</label>
                    {experienceMultiSelect()}

                    <label htmlFor="experience">Employment Type</label>
                    {workTypeMultiSelect()}

                    <label htmlFor="experience">Work Type</label>
                    {employmentTypeMultiSelect()}

                    <label htmlFor="status">Status</label>
                    <select name="status" onChange={(e) => setStatus(e.target.value)}>
                        <option value="DRAFT">Draft</option>
                        <option value="ACTIVE">Published</option>
                    </select>


                    <button type="submit">Create</button>
                </form>
            </div>
        </>
    )


}