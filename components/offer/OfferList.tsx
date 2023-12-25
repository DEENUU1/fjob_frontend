import React, {useEffect, useState} from "react";
import OfferCard from "@/components/offer/offerCard";
import Spinner from "@/components/common/Spinner";
import getApiUrl from "@/components/api";

function OfferList({
                       isRemote,
                       isHybrid,
                       ordering,
                       search,
                       page,
                       experience,
                       workType,
                       employmentType,
                   }) {
    const [offers, setOffers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // @ts-ignore
    const nextPage = offers?.next;
    // @ts-ignore
    const previousPage = offers?.previous;

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

        fetch(process.env.API_URL + url, {headers: {"Allow-Control-Allow-Origin": "*", 'Content-Type': 'application/json'}})
            .then((response) => response.json())
            .then((data) => {
                setOffers(data);
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

                {offers.results.map((offer: any) => (
                    <OfferCard key={offer.title} offer={offer}/>
                ))}
            </div>
        </div>
    );
}

export default OfferList;
