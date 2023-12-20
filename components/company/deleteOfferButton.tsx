import getApiUrl from "@/components/api";
import {useRouter} from "next/navigation";
import { toast } from 'react-toastify';
import {IoTrashBinSharp} from "react-icons/io5";


export default function DeleteOfferButton({offerId}) {
    const token = localStorage.getItem("access")
    const router = useRouter();

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
        <button type="button" className="ml-auto" onClick={handleDeleteOffer}>
            <IoTrashBinSharp />
        </button>
    )

}
