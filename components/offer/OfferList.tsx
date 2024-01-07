import React, {useEffect, useState} from "react";
import OfferCard from "@/components/offer/OfferCard";
import Spinner from "@/components/common/Spinner";

export default function OfferList(
    {
       isRemote,
       isHybrid,
       ordering,
       search,
       page,
       experience,
       workType,
       employmentType,
   }: {
        isRemote: string,
        isHybrid: string,
        ordering: string,
        search: string,
        page: number,
        experience: string,
        workType: string,
        employmentType: string,
    }
   ) {
    const [offers, setOffers] = useState<Offer[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let url = `api/offer/offer?is_remote=${isRemote}&is_hybrid=${isHybrid}&ordering=${ordering}&search=${search}&p=${page}`;

        if (experience !== null && experience !== "All") {
            url += `&experience=${experience}`;
        }

        if (workType !== null && workType !== "All") {
            url += `&work_type=${workType}`;
        }

        if (employmentType !== null && employmentType !== "All") {
            url += `&employment_type=${employmentType}`;
        }

        fetch(process.env.API_URL + url)
            .then((response) => response.json())
            .then((data) => {
                setOffers(data.results);
                setLoading(false);
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });
    }, [isRemote, isHybrid, ordering, search, page, experience, workType, employmentType]);

    if (loading || error || !offers) {
        return (
            <main className="flex min-h-screen flex-col items-center justify-between p-24">
                <Spinner/>;
            </main>
        );
    }

    return (
        <div>
            <div className="mt-20">
                {offers.map((offer: any) => (
                    <OfferCard key={offer.title} offer={offer}/>
                ))}
            </div>
        </div>
    );
}
