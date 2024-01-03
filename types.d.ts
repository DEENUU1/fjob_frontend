type Offer = {
    id: number;
    title: string;
    slug: string;
    description: string;
    company?: string;
    addresses: Address[];
    isRemote?: boolean;
    isHybrid?: boolean;
    applyForm?: string;
    skills: string;
    salary: Salary[];
    experience: Experience[];
    workType?: string[];
    employmentType?: string[];
    createdAt: Date;
    status: string;
    companyLogo: string;
    url: string;
    isScraped: boolean;
    companyName?: string;
    daysUntilExpirationStr: string;
    isExpired?: boolean;
    isNew?: boolean;
};

type Address = {
    id: number;
    country?: string;
    city: City;
    region?: string;
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
    salaryFrom?: number;
    salaryTo: number;
    currency: string;
    schedule: string;
};

type Experience = {
    id: number;
    name: string;
};
