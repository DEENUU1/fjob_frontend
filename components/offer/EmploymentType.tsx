'use client'
import {useEffect, useState} from "react";


export default function getEmploymentTypes(){
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [employmentTypes, setEmploymentTypes] = useState();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        fetch(process.env.API_URL + "api/offer/employment")
            .then(response => response.json())
            .then(data => setEmploymentTypes(data));
    }, []);

    return employmentTypes;


}