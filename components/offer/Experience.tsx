'use client'
import {useEffect, useState} from "react";


export default function getExperiences(){
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [employmentTypes, setEmploymentTypes] = useState<Experience[] | null>();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        fetch(process.env.API_URL + "api/offer/experience")
            .then(response => response.json())
            .then(data => setEmploymentTypes(data));
    }, []);

    return employmentTypes;


}