'use client'

import {useState} from "react";
import {FaFlag} from "react-icons/fa";
import getApiUrl from "@/components/api";
import { toast } from 'react-toastify';
import {useRetrieveUserQuery} from "@/redux/features/authApiSlice";



const onSend = (description: string, offerId: number, userId: number, ) => {
    const token = localStorage.getItem('access')

    const handlePostReport = async () => {
        try {
            const response = await fetch(`${getApiUrl()}/api/support/report`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({"offer": offerId, "user": userId, "description": description})
            })

            if (response.status == 201) {
                toast.success('Report sent')
            } else {
                toast.error('Something went wrong')
            }

        } catch (error) {
            console.log(error)
            toast.error('Something went wrong')
        }
    }
}

const ReportModal = ({offerId}) => {
    // Todo add modal here

    const [description, setDescription] = useState('')
    const {data: user} = useRetrieveUserQuery()

    const handleChange = (e) => {
        setDescription(e.target.value);
    };

    const handleSubmit = () => {
        onSend(description, offerId, user.id);
    }

    return (
        <div>
            <FaFlag/>
        </div>
    )
}

export default ReportModal;
