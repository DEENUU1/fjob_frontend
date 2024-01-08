'use client';

import {useEffect, useState} from "react";


export default function CandidateStat(offer_id: number){
    const [stat, setStat] = useState<any>(null);

    useEffect(() => {
        fetch(process.env.API_URL + `api/candidate/candidate/${offer_id}/stat`, {
            credentials: "include",
        })
            .then((res) => res.json())
            .then((data) => setStat(data))
    }, [offer_id])

    return stat
}