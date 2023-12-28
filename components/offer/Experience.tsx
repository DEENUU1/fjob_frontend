'use client'
import {useEffect, useState} from "react";


export default function GetExperiences(){
    const [employmentTypes, setEmploymentTypes] = useState();
    useEffect(() => {
        fetch(process.env.API_URL + "api/offer/experience")
            .then(response => response.json())
            .then(data => setEmploymentTypes(data));
    }, []);

    return employmentTypes;


}