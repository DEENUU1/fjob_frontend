'use client'

import Link from "next/link";

async function getCompany() {
  const token = localStorage.getItem("access")

  const response = await fetch(process.env.API_URL + "api/company/company", {
    headers: {
      accept: "application/json",
      // Authorization: `Bearer ${token}`
    },
    credentials: "include"
  })
  return await response.json()

}


export default async function AddOffer() {
  const data = await getCompany()

  return (
    <div className="mt-2">
      {data.num_of_offers_to_add > 0 ? (
        <div>
          <Link className="px-6 py-2 text-black bg-blue-400 hover:bg-blue-500 rounded-md " href="/company/offer/create">Add
            offer</Link>
          <strong className="mt-2"> You can create {data.num_of_offers_to_add} offers </strong>
        </div>
      ) : (
        <div>
          <Link className="px-6 py-2 text-black bg-blue-400 hover:bg-blue-500 rounded-md md:ml-5" href="/product">Check
            our plans</Link>
          <strong className="mt-2"> You can not create new offer </strong>
        </div>
      )}
    </div>

  )
}