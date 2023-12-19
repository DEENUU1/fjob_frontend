'use client'

import getApiUrl from "@/components/api";
import Link from "next/link";


async function getCompanyOfferList(){
    const token = localStorage.getItem("access");

    const response = await fetch(`${getApiUrl()}api/company/offer`, {
           headers: {
               Authorization: `Bearer ${token}`,
               accept: 'application/json',
           }
    })

    return await response.json()

}


export default async function OfferList() {
    const data = await getCompanyOfferList()

    return (
        <>
            <div>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right">
                        <thead className="text-xs">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Title
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Created at
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Updated at
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Status
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Candidates
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Actions
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {data && (
                            data.map((offer:any) =>(
                            <tr key={offer.slug} className="border-b">
                                <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
                                    {offer.title}
                                </th>
                                <td className="px-6 py-4">
                                    {offer.created_at}
                                </td>
                                <td className="px-6 py-4">
                                    {offer.updated_at}
                                </td>
                                <td className="px-6 py-4 font-bold">
                                    {offer.status}
                                </td>
                                <td className="px-6 py-4 font-bold">
                                    <Link href="/" className="font-medium text-blue-600  hover:underline">Candidates</Link>
                                </td>
                                <td className="px-6 py-4 space-x-2">
                                    <Link href="/" className="font-medium text-blue-600  hover:underline">Edit</Link>
                                    <Link href="/" className="font-medium text-red-600  hover:underline">Delete</Link>
                                </td>
                            </tr>
                            ))
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}