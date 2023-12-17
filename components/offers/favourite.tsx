'use client'

import getApiUrl from "@/components/api";
import { toast } from 'react-toastify';
import {FaHeart} from "react-icons/fa";
import { useRetrieveUserQuery } from '@/redux/features/authApiSlice';

// @ts-ignore
const FavouriteButton = ({offerId}) => {
    const {data:user} = useRetrieveUserQuery()
    const token = localStorage.getItem('access')

    const handlePostFavourite = async () => {
        try {
            const response = await fetch(`${getApiUrl()}api/favourite/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({offer: offerId, user: user.id})
            })

            if (response.status == 201) {
                toast.success('Offer added to favourites')
            } else if (response.status == 400) {
                toast.info('Offer already added to favourite')
            }
        } catch (error) {
            toast.error('Something went wrong')
        }

    }

    return (
        <button onClick={handlePostFavourite}> <FaHeart/> </button>
    )
}

export default FavouriteButton;