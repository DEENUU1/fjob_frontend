'use client'

import { redirect } from 'next/navigation';
import Spinner from '@/components/common/Spinner';
import {useRetrieveUserQuery} from "@/redux/features/authApiSlice";
import { toast } from 'react-toastify';


interface Props {
    children: React.ReactNode

}

export default function UserOnly({children}: Props) {
    const { data: user, isLoading, isFetching } = useRetrieveUserQuery();

    if (isLoading || isFetching) {
        return (
            <div className='flex justify-center my-8'>
                <Spinner />
            </div>
        );
    }

    if (!(user?.account_type === "USER")) {
        toast.error("You are not authorized to access this page")
        redirect("/");
    }

    return <>{children}</>;
}