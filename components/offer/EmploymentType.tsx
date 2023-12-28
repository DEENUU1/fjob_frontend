'use client'
import {useEffect, useState} from "react";


export default function GetEmploymentTypes(){
    const [employmentTypes, setEmploymentTypes] = useState();
    useEffect(() => {
        fetch(process.env.API_URL + "api/offer/employment")
            .then(response => response.json())
            .then(data => setEmploymentTypes(data));
    }, []);

    return employmentTypes;


}