'use client';

import {useState, useEffect} from "react";
import {Rating} from "@material-tailwind/react";
import {toast} from "react-toastify";

export default function RateOffer({offerId, offerSlug}: { offerId: number, offerSlug: string }) {

  const [rate, setRate] = useState<number | null>(null);

  useEffect(() => {
    const sendRate = async () => {
      if (rate !== null) {
        try {
          const response = await fetch(`${process.env.API_URL}api/offer/offer/${offerSlug}/rate`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({job_offer: offerId, rate}),
          });

          if (response.ok) {
            const data = await response.json();
            setRate(data.rate);
            toast.success("Rate sent successfully");
          } else if (response.status === 429) {
            toast.info("Too many requests");
            toast.info("You can rate 5 offers per day")
          } else {
            toast.error("Rate sending failed");
          }
        } catch (error) {
          toast.error("Rate sending failed");
        }
      }
    };

    sendRate();
  }, [offerSlug, offerId, rate]);

  return (
    <>
      <div>
        <Rating
          unratedColor="amber"
          ratedColor="amber"
          placeholder={undefined}
          onChange={(value) => setRate(value)}
        />
      </div>
    </>
  )
}