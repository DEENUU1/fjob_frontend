'use client'

import getApiUrl from "@/components/api";
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import {RiDeleteBin5Line, RiDeleteBin6Fill} from "react-icons/ri";
import {useState} from "react";

const FavouriteButtonDelete = ({offerId}) => {
    const token = localStorage.getItem('access')
    const router = useRouter();
    const [isHover, setIsHover] = useState(false);
    const onMouseEnter = () => setIsHover(true);
    const onMouseLeave = () => setIsHover(false);

    const handleDeleteFavourite = async () => {
        try {
            const response = await fetch(`${getApiUrl()}api/favourite/${offerId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
            })

            if (response.status == 204) {
                toast.success('Delete offer from favourite')
                router.refresh();
            } else if (response.status == 400) {
                toast.info('Error!')
            }
        } catch (error) {
            toast.error('Something went wrong')
        }

    }

    return (
        <button className="cursor-pointer ml-auto text-xl" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} type="button" onClick={handleDeleteFavourite}>
            {isHover ? (
                <RiDeleteBin6Fill />
            ): (
                <RiDeleteBin5Line />

            )}
        </button>
    )
}

export default FavouriteButtonDelete;