'use client'

import {useState} from "react";
import getApiUrl from "@/components/api";
import {toast} from "react-toastify";

export default function CreateJobOffer(){
    const token = localStorage.getItem("access")
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [addresses, setAddresses] = useState([])
    const [isRemote, setIsRemote] = useState(false)
    const [isHybrid, setIsHybrid] = useState(false)
    const [applyForm, setApplyForm] = useState("")
    const [skills, setSkills] = useState([])
    const [experience, setExperience] = useState([])
    const [workType, setWorkType] = useState([])
    const [employmentType, setEmploymentType] = useState([])
    const [status, setStatus] = useState("")

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


        try{
            const response = await fetch(`${getApiUrl()}api/offer/`, {
                method: "POST",
                headers: {
                    accept: "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: formData,
            });

            if (response.ok){
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
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="title" required autoComplete="false"
                       name="title"
                       value={title}
                       onChange={(e) => setTitle(e.target.value)}/>
                <textarea placeholder="description" name="description" required autoComplete="false"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}/>
                <button type="submit">Create</button>
            </form>

        </>
    )


}