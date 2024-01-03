type Offer = {
    id: number;
    title: string;
    slug: string;
    description: string;
    company?: string;
    addresses: Address[];
    is_remote?: boolean;
    is_hybrid?: boolean;
    apply_form?: string;
    skills: string;
    salary: Salary[];
    experience: Experience[];
    work_type?: string[];
    employment_type?: string[];
    createdAt: Date;
    status: string;
    company_logo: string;
    url: string;
    company_name?: string;
    days_until_expiration_str: string;
    is_expired?: boolean;
    is_new?: boolean;
    is_scraped: boolean;
    created_at: string;
};

type Country = {
    id: number
    name: string
}

type Region = {
    id: number
    name: string
    country?: Country
}

type Address = {
    id: number;
    country: Country;
    city: City;
    region: Region;
    street?: string;
};

type City = {
    id: number;
    name: string;
    latitude?: number;
    longitude?: number;
    region?: string;
    country?: string;
};

type Salary = {
    id: number;
    salary_from?: number;
    salary_to?: number;
    currency?: string;
    schedule?: string;
};

type Experience = {
    id: number;
    name: string;
};

type OfferResult = {
    count: number;
    next?: string | null;
    previous?: string | null;
    results: Offer[];
}

type Employment = {
    id: number;
    name: string;
}