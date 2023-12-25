'use client'

import getApiUrl from "@/components/api";
import {useEffect, useState} from "react";


export default function GetEmploymentTypes(){
    const [employmentTypes, setEmploymentTypes] = useState();
    useEffect(() => {
        fetch(`${getApiUrl()}api/offer/employment`)
            .then(response => response.json())
            .then(data => setEmploymentTypes(data));
    }, []);

    return employmentTypes;


}