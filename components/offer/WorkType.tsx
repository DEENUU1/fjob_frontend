'use client'
import {useEffect, useState} from "react";


export default function getWorkType() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [employmentTypes, setEmploymentTypes] = useState<WorkerType[] | null>();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    fetch(process.env.API_URL + "api/offer/work")
      .then(response => response.json())
      .then(data => setEmploymentTypes(data));
  }, []);

  return employmentTypes;


}