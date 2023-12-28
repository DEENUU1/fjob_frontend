'use client'

import { toast } from 'react-toastify';
import { useRetrieveUserQuery } from '@/redux/features/authApiSlice';
import {useAppSelector} from "@/redux/hooks";
import {useState} from "react";
import { IoHeartOutline } from "react-icons/io5";
import { IoHeartSharp } from "react-icons/io5";

// @ts-ignore
const FavouriteButton = ({offerId}) => {
    const {isLoading, isAuthenticated} = useAppSelector(state => state.auth);
    const {data:user} = useRetrieveUserQuery()
    const token = localStorage.getItem('access')
    const [isHover, setIsHover] = useState(false);
    const onMouseEnter = () => setIsHover(true);
    const onMouseLeave = () => setIsHover(false);

    const handlePostFavourite = async () => {
        try {

            if (!isAuthenticated) {
                toast.info('You need to be logged in to add offer to favourites')
                return
            }

            const response = await fetch(process.env.API_URL + "api/favourite/", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({offer: offerId, user: user?.id})
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
        <button className="cursor-pointer ml-auto text-xl" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} type="button" onClick={handlePostFavourite}>
            {isHover ? (
                <IoHeartSharp />
            ): (
                <IoHeartOutline />

            )}
        </button>
    )
}

export default FavouriteButton;