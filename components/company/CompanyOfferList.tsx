'use client'

import EditOfferModal from "@/components/company/EditOffer";
import DeleteOfferButton from "@/components/company/DeleteOfferButton";
import Link from "next/link";


async function getCompanyOfferList(){
    const response = await fetch( process.env.API_URL + "api/offer/company", {
           credentials: "include"
    })

    return await response.json()

}


export default async function OfferList() {
    const data = await getCompanyOfferList()

    return (
        <>
            <div>
                <h3 className="text-2xl mt-5 mb-5">Offers</h3>

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
                                Candidates
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Status
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Available
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
                                <td className="px-6 py-4">
                                    {offer.apply_form !== null ? (
                                        <span>N/A</span>
                                    ): (
                                        <Link href={`/company/offer/candidate/${offer.id}`} className="text-blue-500 hover:underline cursor-pointer">Candidates ({offer?.candidate_count})</Link>
                                    )}
                                </td>
                                <td className="px-6 py-4 font-bold">
                                    {offer.status}
                                </td>
                                <td className="px-6 py-4 space-x-2">
                                    <strong>{offer.days_until_expiration_str}</strong>
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