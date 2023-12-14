'use client'

import getApiUrl from "@/components/api";
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation'
    ;
// @ts-ignore
const FavouriteButtonDelete = ({offerId}) => {
    const token = localStorage.getItem('access')
    const router = useRouter();

    const handlePostFavourite = async () => {
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
                toast.info('Error')
            }
        } catch (error) {
            console.log(error)
            toast.error('Something went wrong')
        }

    }

    return (
        <button onClick={handlePostFavourite}> Delete </button>
    )
}

export default FavouriteButtonDelete;