'use client'


import Link from "next/link";
import {Badge} from "@/components/ui/badge"

async function getAppliedOffers() {
  const response = await fetch(process.env.API_URL + "api/candidate/candidate/user/", {
    credentials: "include",
  });

  return response.json();
}


function AppliedCard({data}: any) {
  return (
    <>
      <div>
        <Link href={`/offer/${data.job_offer.slug}`}>
          <h2 className="text-xl font-semibold text-blue-500 hover:underline cursor-pointer">{data.job_offer.title}</h2>
        </Link>
      </div>
      <div className="mt-2 flex items-center">
        <p className="text-gray-700 mr-2">Status:</p>
        <Badge>{data.status}</Badge>
      </div>

      <div className="mt-2">
        <p className="text-gray-700">Applied on:</p>
        <span className="text-gray-600">{data.created_at}</span>
      </div>
    </>
  )
}

export default async function AppliedOffers() {
  const offerData = await getAppliedOffers();

  return (
    <div className="flex flex-col">
      {offerData.length === 0 ? (
        <p>You did not apply on any offer</p>
      ) : (
        offerData.map((offer: UserAppliedOffer) => (
          <div key={offer.id}
               className="border-2 border-black border-opacity-50 rounded-xl mb-2 p-5 hover:shadow-md transition duration-300">
            <AppliedCard data={offer}/>
          </div>
        ))
      )}
    </div>
  )
}
