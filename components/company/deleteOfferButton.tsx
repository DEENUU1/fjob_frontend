"use client"

import getApiUrl from "@/components/api";
import {useRouter} from "next/navigation";
import { toast } from 'react-toastify';
import { RiDeleteBin5Line } from "react-icons/ri";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { useState } from "react";


export default function DeleteOfferButton({offerId}) {
    const token = localStorage.getItem("access")
    const router = useRouter();
    const [isHover, setIsHover] = useState(false);
    const onMouseEnter = () => setIsHover(true);
    const onMouseLeave = () => setIsHover(false);


    const handleDeleteOffer = async () => {
        try {
            const response = await fetch(`${getApiUrl()}api/offer/company/${offerId}`, {
                method: "DELETE",
                headers: {
                    accept: "application/json",
                    Authorization: `Bearer ${token}`
                }
            })

            if (response.ok) {
                toast.success("Offer deleted successfully")
                router.refresh()
            } else {
                toast.error("Offer deletion failed")
            }

        } catch (error) {
            toast.error("Something went wrong")
        }
    }

    return (
            <button className="cursor-pointer ml-auto text-xl" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} type="button" onClick={handleDeleteOffer}>
                {isHover ? (
                    <RiDeleteBin6Fill />
                ): (
                    <RiDeleteBin5Line />

                )}
            </button>
    )

}
