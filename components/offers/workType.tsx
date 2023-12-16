import getApiUrl from "@/components/api";
import {useEffect, useState} from "react";


export default function getWorkType(){
    const [employmentTypes, setEmploymentTypes] = useState();
    useEffect(() => {
        fetch(`${getApiUrl()}api/offer/work`)
            .then(response => response.json())
            .then(data => setEmploymentTypes(data));
    }, []);

    return employmentTypes;


}