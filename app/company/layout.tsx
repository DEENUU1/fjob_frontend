import { RequireAuth } from '@/components/utils';
import Link from "next/link";
import {useRetrieveUserQuery} from "@/redux/features/authApiSlice";

interface Props {
    children: React.ReactNode;
}

export default function Layout({ children }: Props) {
    return (
        <RequireAuth>
            <header className='bg-white shadow'>
                <div className='mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8'>
                    <h1 className='text-3xl font-bold tracking-tight text-gray-900'>
                        Company dashboard
                    </h1>
                    <div className="mt-4">
                        <span><Link className="bg-black p-3 text-white hover:bg-gray-800" href="/company"> Home </Link></span>
                        <span><Link className="bg-black p-3 text-white hover:bg-gray-800" href="/company/offer"> Offer </Link></span>

                    </div>

                </div>
            </header>
            {children}
        </RequireAuth>
    )
}
