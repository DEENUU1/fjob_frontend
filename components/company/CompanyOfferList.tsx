'use client'

import Link from "next/link";
import EditOfferModal from "@/components/company/EditOffer";
import DeleteOfferButton from "@/components/company/DeleteOfferButton";

async function GetCompanyOfferList(){
    const token = localStorage.getItem("access");

    const response = await fetch( process.env.API_URL + "api/company/offer", {
           headers: {
               Authorization: `Bearer ${token}`,
               accept: 'application/json',
           }
    })

    return await response.json()

}


export default async function OfferList() {
    const data = await GetCompanyOfferList()

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
                                <td className="px-6 py-4 space-x-2">
                                    <EditOfferModal offer={offer}/>
                                    <DeleteOfferButton offerId={offer.id}/>
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