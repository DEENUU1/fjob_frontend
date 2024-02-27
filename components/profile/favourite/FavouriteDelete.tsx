'use client'

import {toast} from 'react-toastify';
import {RiDeleteBin5Line, RiDeleteBin6Fill} from "react-icons/ri";
import {useState} from "react";

const FavouriteButtonDelete = ({offerId}: { offerId: number }) => {
  const [isHover, setIsHover] = useState(false);
  const onMouseEnter = () => setIsHover(true);
  const onMouseLeave = () => setIsHover(false);

  const handleDeleteFavourite = async () => {
    try {
      const response = await fetch(process.env.API_URL + `api/favourite/${offerId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: "include",
      })

      if (response.status == 204 || response.status == 301) {
        toast.success('Delete offer from favourite')
      } else if (response.status == 400) {
        toast.info('Error!')
      }
    } catch (error) {
      toast.error('Something went wrong')
    }

  }

  return (
    <button className="cursor-pointer ml-auto text-xl" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}
            type="button" onClick={handleDeleteFavourite}>
      {isHover ? (
        <RiDeleteBin6Fill/>
      ) : (
        <RiDeleteBin5Line/>
      )}
    </button>
  )
}

export default FavouriteButtonDelete;