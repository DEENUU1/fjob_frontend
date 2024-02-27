'use client';

import {useEffect, useState,} from "react";


export default function getCompanyCategory() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [categories, setCategories] = useState<CompanyCategory[]>([]);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    fetch(process.env.API_URL + "api/company/category")
      .then(response => response.json())
      .then(data => setCategories(data));
  }, []);

  return categories;
}